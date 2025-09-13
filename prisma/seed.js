const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// A simple, one-time seed script to set up the initial data for the application.
// This should only be run on a new, empty database.
async function main() {
  console.log("Starting database seeding...");

  // --- Step 1: Create the first Organization (the top-level tenant) ---
  const initialOrgName = "Noma Inc.";
  let organization = await prisma.organization.findUnique({
    where: { name: initialOrgName }
  });

  if (!organization) {
    organization = await prisma.organization.create({
      data: {
        name: initialOrgName,
      },
    });
  }

  console.log(`Created or found Organization with ID: ${organization.id}`);

  // --- Step 2: Create the SuperAdmin Role with all permissions ---
  // A SuperAdmin has all possible permissions. We will define these permissions
  // explicitly to make the role comprehensive from the start.
  const adminRolePermissions = [
    // Organization management
    "organization:create",
    "organization:read",
    "organization:update",
    "organization:delete",
    // User management
    "user:create",
    "user:read",
    "user:update",
    "user:delete",
    // Role management
    "role:create",
    "role:read",
    "role:update",
    "role:delete",
    // Project management
    "project:create",
    "project:read",
    "project:update",
    "project:delete",
    // Resource management
    "resource:create",
    "resource:read",
    "resource:update",
    "resource:delete",
    // Task management
    "task:create",
    "task:read",
    "task:update",
    "task:delete",
  ];
  const adminRoleName = "SuperAdmin";
  const superAdminRole = await prisma.role.upsert({
    where: { name: adminRoleName },
    update: {},
    create: {
      name: adminRoleName,
      permissions: adminRolePermissions,
    },
  });
  console.log(`Created or found Role with ID: ${superAdminRole.id}`);

  // --- Step 3: Create the first SuperAdmin user ---
  // This is the initial user who will have full access.
  // In a real application, you would make this configurable.
  const adminEmail = "victoroluborode110@noma.com";
  const adminPassword = "ADMIN123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const superAdminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Super Admin",
      passwordHash: passwordHash,
      organizationId: organization.id,
      roleId: superAdminRole.id,
    },
  });
  console.log(`Created or found user with ID: ${superAdminUser.id}`);

  console.log("Database seeding finished.");
}

// Execute the main seeding function and handle any errors.
main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    // eslint-disable-next-line no-undef
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
