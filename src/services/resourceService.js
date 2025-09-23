const BaseService = require("./baseService");

class ResourceService extends BaseService {
  constructor(organizationId) {
    super(organizationId);
  }

  async createResource(resourceData) {
    return await this.resourceRepository.create({ data: resourceData });
  }

  async getResources(resourceQuery) {
    return await this.resourceRepository.findMany({ where: resourceQuery });
  }

  async getResourceById(resourceId) {
    return await this.resourceRepository.findUnique({
      where: { id: resourceId },
    });
  }

  async deleteResourceById(resourceId) {
    return await this.resourceRepository.delete({ where: { id: resourceId } });
  }

  async updateResource(resourceId, updatedData) {
    return await this.resourceRepository.update({
      where: { id: resourceId },
      data: { ...updatedData },
    });
  }

  async assignResourceToProject(projectId, resourceId) {
    return await this.runInTransaction(async (tx) => {
      const project = await this.projectRepository.findUnique(
        {
          where: { id: projectId },
        },
        tx
      );

      if (!project) {
        throw new Error("Project not found.");
      }

      const resource = await this.resourceRepository.findUnique(
        {
          where: { id: resourceId },
        },
        tx
      );

      if (!resource) {
        throw new Error("Project not found.");
      }

      const existingAssignment =
        await this.projectResourceRepository.findUnique(
          {
            where: {
              projectId_resourceId_organizationId: {
                projectId: projectId,
                resourceId: resourceId,
                organizationId: this.organizationId,
              },
            },
          },
          tx
        );

      if (existingAssignment) {
        throw new Error("Resource is already assigned to this project.");
      }

      const newAssignment = await this.projectResourceRepository.create(
        {
          data: {
            projectId,
            resourceId,
          },
        },
        tx
      );

      return newAssignment;
    });
  }

  async getProjectResources(projectId) {
    return await this.projectResourceRepository.findMany({
      where: {
        projectId,
      },
      include: {
        resource: true,
      },
    });
  }
}

module.exports = ResourceService;