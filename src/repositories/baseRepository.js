const { enforceTenantScope } = require("../utils/tenantscope");
const prisma = require("../config/prismaClient");

class BaseRepository {
  constructor(modelName, organizationId) {
    this.modelName = modelName;
    this.organizationId = organizationId;
  }

  async create(args, tx) {
    const prismaClient = tx || prisma;
    return enforceTenantScope(
      "create",
      this.modelName,
      args,
      this.organizationId,
      prismaClient
    );
  }

  async findUnique(args, tx) {
    const prismaClient = tx || prisma;
    return enforceTenantScope(
      "findUnique",
      this.modelName,
      args,
      this.organizationId,
      prismaClient
    );
  }

  async findMany(args = {}, tx) {
    const prismaClient = tx || prisma;
    return enforceTenantScope(
      "findMany",
      this.modelName,
      args,
      this.organizationId,
      prismaClient
    );
  }

  async update(args, tx) {
    const prismaClient = tx || prisma;
    return enforceTenantScope(
      "update",
      this.modelName,
      args,
      this.organizationId,
      prismaClient
    );
  }

  async delete(args, tx) {
    const prismaClient = tx || prisma;

    const updatedArgs = {
      ...args,
      data: {
        ...args.data,
        isDeleted: true,
        deletedAt: new Date(),
      },
    };
    return enforceTenantScope(
      "update",
      this.modelName,
      updatedArgs,
      this.organizationId,
      prismaClient
    );
  }

  async runInTransaction(callback) {
    return await prisma.$transaction(async (tx) => {
      return await callback(tx);
    });
  }
}

module.exports = BaseRepository;
