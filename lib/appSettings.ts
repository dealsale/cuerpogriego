import { prisma } from "@/lib/prisma";

const SETTINGS_ID = "singleton";

export async function getAppSettings() {
  return prisma.appSettings.upsert({
    where: { id: SETTINGS_ID },
    update: {},
    create: { id: SETTINGS_ID },
  });
}

export async function setRegistrationOpen(open: boolean) {
  return prisma.appSettings.upsert({
    where: { id: SETTINGS_ID },
    update: { registrationOpen: open },
    create: { id: SETTINGS_ID, registrationOpen: open },
  });
}
