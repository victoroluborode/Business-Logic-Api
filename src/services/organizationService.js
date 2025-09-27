// const prisma = require("../config/prismaClient");

const BaseService = require("./baseService");

class OrganizationService extends BaseService {
  constructor(organizationId) {
    super(organizationId);
  }

  async getOrganizationSettings(organizationId) {
    if (!organizationId) {
      throw new Error("OrganizationId is required");
    }
    return await this.organizationRepository.findUnique({
      where: { id: organizationId },
    });
  }

  async updateOrganizationSettings(organizationId, organizationData) {
    if (!organizationId || !organizationData) {
      throw new Error("OrganizationId and data are required");
    }

    if (typeof organizationData !== "object") {
      throw new Error("organizationData must be an object");
    }
    return await this.organizationRepository.update({
      where: { id: organizationId },
      data: { ...organizationData },
    });
  }
}

module.exports = OrganizationService;