const BaseService = require("./baseService");

class ProjectService extends BaseService {
    constructor(organizationId) {
        super(organizationId);
    }

    async createProject(projectData) {
        return await this.runInTransaction(async (tx) => {
            const project = await this.projectRepository.create({data: projectData}, tx);
            const defaultTaskData = {
                title: "Getting started",
                projectId: project.id
            }

            const task = await this.taskRepository.create({ data: defaultTaskData }, tx);
            return { project, task };
            
        })
    }

    async getProjects(projectQuery) {
        return await this.projectRepository.findMany({ where: projectQuery });
    }

    async getProjectById(projectId) {
        return await this.projectRepository.findUnique({ where: { id: projectId } });
    }

    async deleteProjectById(projectId) {
        return await this.projectRepository.delete({ where: { id: projectId } });
    }

    async updateProject(projectId, updatedData) {
        return await this.projectRepository.update({
            where: { id: projectId },
            data: {...updatedData}
        })
    }
}

module.exports = ProjectService;