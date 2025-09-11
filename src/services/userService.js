const prisma = require("../config/prismaClient");
const bcrypt = require("bcrypt");

const createUser = async (
  name,
  email,
  password,
  departmentId,
  organizationId,
  roleId
) => {
  try {
    if (name && email && password && organizationId) {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          passwordhash: passwordHash,
          departmentId: departmentId,
          organizationId: organizationId,
          roleId: roleId,
        },
      });

      const userObject = {
        name: user.name,
        email: user.email,
        organization: user.organization,
      };

      return userObject;
    } else {
      throw new Error(
        "Name, email, password, and organization ID are required."
      );
    }
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

const getUsersByOrganization = async (organizationId) => {
    try {
        if (organizationId) {
            const users = await prisma.user.findMany({
              where: { organizationId: organizationId },
              orderBy: { name: "asc" },
            });
            return users;
        } else {
            throw new Error("OrganizationId is required")
        }
        
    } catch (err) {
        console.error("Error getting users", err);
        throw err;
    }
}

module.exports = { createUser, getUsersByOrganization };
