import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { inferPatron } from "../lib/exercisePatterns";
import { normalizeName } from "../lib/exerciseMatch";

const SEED_EXERCISE_NAMES = [
  "Press de banca con mancuernas",
  "Press inclinado",
  "Aperturas",
  "Fondos en banco",
  "Remo con barra",
  "Jalón al pecho",
  "Curl de bíceps",
  "Sentadilla",
  "Peso muerto rumano",
  "Plancha",
  "Press militar",
  "Elevaciones laterales",
  "Burpees",
];

async function main() {
  const adminEmail = "admin@cuerpogriego.app";
  const adminPassword = "admin1234";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash,
      isAdmin: true,
      onboarded: true,
    },
  });
  console.log(`Admin listo: ${admin.email} (password: ${adminPassword})`);

  for (const name of SEED_EXERCISE_NAMES) {
    const normalizedName = normalizeName(name);
    await prisma.exerciseMedia.upsert({
      where: { normalizedName },
      update: {},
      create: {
        name,
        normalizedName,
        pattern: inferPatron(name),
        mediaType: "",
        mediaUrl: "",
      },
    });
  }
  console.log(`Catálogo de ejercicios: ${SEED_EXERCISE_NAMES.length} entradas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
