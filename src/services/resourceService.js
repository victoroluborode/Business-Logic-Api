const BaseService = require("./baseService");

class ResourceService extends BaseService {
    constructor(organizationId) {
        super(organizationId)
    }

    async createResource(resourceData) {
        return await this.resourceRepository.create({ data: resourceData });
    }

    async getResources(resourceQuery) {
        return await this.resourceRepository.findMany({ where: resourceQuery });
    }

    async getResourceById(resourceId) {
        return await this.resourceRepository.findUnique({ where: { id: resourceId } });
    }

    async deleteResourceById(resourceId) {
        return await this.resourceRepository.delete({ where: { id: resourceId } });
    }

    async updateResource(resourceId, updatedData) {
        return await this.resourceRepository.update({
            where: { id: resourceId },
            data: {...updatedData}
        })
    }

    async assignResourceToProject(projectId, resourceId) {
        return await this.
    }
}

module.exports = ResourceService;