const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log("Prisma client connected successfully to the database.");
  } catch (err) {
    console.log("Prisma client connection failed:", err);
  }
})();

module.exports = prisma;
