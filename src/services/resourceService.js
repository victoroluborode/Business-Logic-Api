const BaseService = require("./baseService");

class ResourceService extends BaseService {
  constructor(organizationId) {
    super(organizationId);
  }

  async createResource(resourceData) {
    if (!resourceData) {
      throw new Error("resourceData is required");
    }
    return await this.resourceRepository.create({ data: resourceData });
  }

  async getResources(resourceQuery) {
    if (!resourceQuery) {
      throw new Error("resourceQuery is required");
    }

    if (typeof resourceQuery !== "object") {
      throw new Error("resourceQuery must be an object")
    }
    return await this.resourceRepository.findMany({ where: resourceQuery });
  }

  async getResourceById(resourceId) {
    if (!resourceId) {
      throw new Error("resourceId is required");
    }
    return await this.resourceRepository.findUnique({
      where: { id: resourceId },
    });
  }

  async deleteResourceById(resourceId) {
    if (!resourceId) {
      throw new Error("resourceId is required")
    }
    return await this.resourceRepository.delete({ where: { id: resourceId } });
  }

  async updateResource(resourceId, resourceData) {
    if (!resourceId || !resourceData) {
      throw new Error("resourceId and resourceData are required");
    }

    if (typeof resourceData !== "object") {
      throw new Error("resourceData must be an object");
    }
    return await this.resourceRepository.update({
      where: { id: resourceId },
      data: { ...resourceData },
    });
  }

  async assignResourceToProject(projectId, resourceId) {
    if (!projectId || !resourceId) {
      throw new Error("projectId and resourceId are required");
    }
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
        throw new Error("Resource not found.");
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
    if (!projectId) {
      throw new Error("projectId is required");
    }
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