// const prisma = require("../config/prismaClient");
const bcrypt = require("bcrypt");
const BaseService = require("./baseService");

class UserService extends BaseService {
  constructor(organizationId) {
    super(organizationId)
  }

  async createUser(userData) {
    if (!userData) {
      throw new Error("userData is required");
    }

    if (typeof userData !== "object") {
      throw new Error("userData must be an object");
    }
    const { name, email, password, departmentId, organizationId, roleId } =  userData;
    if (!name || !email || !password || !departmentId || !organizationId || !roleId) {
      throw new Error("Name, email, password, department ID, and role ID are required.");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const formattedData = {
      name: name,
      email: email,
      passwordHash: passwordHash,
      departmentId: departmentId,
      organizationId: organizationId,
      roleId: roleId
    }


    return await this.userRepository.create({ data: formattedData });
  }

  async getUser(userId) {
    if (!userId) {
      throw new Error("userId is required");
    }
    return await this.userRepository.findUnique({ where: { id: userId } });
  }

  async getUsers(userQuery) {
    if (!userQuery) {
      throw new Error("userQuery is required");
    }

    if (typeof userQuery !== "object") {
      throw new Error("userQuery must be an object");
    }
    return await this.userRepository.findMany({ where: userQuery });
  }

  async deactivateUser(userId) {
    if (!userId) {
      throw new Error("userId is required");
    }
    return await this.userRepository.update({
      where: { id: userId },
      data: {isDeactivated: true}
    })
  }
}

module.exports = UserService;
