interface SignResponse {
  timestamp: number;
  folder: string;
  signature: string;
  apiKey: string;
  cloudName: string;
}

export interface UploadResult {
  url: string;
  mediaType: "video" | "gif";
}

const MAX_SIZE = 50 * 1024 * 1024;

export async function uploadToCloudinary(file: File, signEndpoint: string): Promise<UploadResult> {
  if (file.size > MAX_SIZE) {
    throw new Error("El archivo supera los 50 MB.");
  }

  const signRes = await fetch(signEndpoint, { method: "POST" });
  if (!signRes.ok) {
    const err = await signRes.json().catch(() => ({}));
    throw new Error(err.error || "No se pudo iniciar la subida.");
  }
  const { timestamp, folder, signature, apiKey, cloudName }: SignResponse = await signRes.json();

  const formData = new FormData();
  formData.set("file", file);
  formData.set("timestamp", String(timestamp));
  formData.set("folder", folder);
  formData.set("signature", signature);
  formData.set("api_key", apiKey);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await uploadRes.json();
  if (!uploadRes.ok) {
    throw new Error(data?.error?.message || "No se pudo subir el archivo.");
  }

  return {
    url: data.secure_url as string,
    mediaType: data.resource_type === "video" ? "video" : "gif",
  };
}
