import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  if (!user.isAdmin) redirect("/app/inicio");

  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <div className="p-[clamp(24px,4vw,44px)] bg-ink overflow-auto">{children}</div>
    </div>
  );
}
