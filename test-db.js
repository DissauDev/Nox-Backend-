// test-db.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Conexión exitosa a PostgreSQL con Prisma");
  } catch (e) {
    console.error("❌ Error de conexión:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
