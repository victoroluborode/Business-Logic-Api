const BaseService = require("./baseService");

class ProjectService extends BaseService {
    constructor(organizationId) {
        super(organizationId);
    }

    async createProject(projectData) {
        if (!projectData) {
            throw new Error("projectData is required");
        }
        
         if (typeof projectData !== "object") {
           throw new Error("projectData must be an object");
         }
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
        if (!projectQuery) {
          throw new Error("projectQuery is required");
        }

        if (typeof projectQuery !== "object") {
          throw new Error("projectQuery must be an object");
        }
        return await this.projectRepository.findMany({ where: projectQuery });
    }

    async getProjectById(projectId) {
        if (!projectId) {
            throw new Error("projectId is required")
        }
        return await this.projectRepository.findUnique({ where: { id: projectId } });
    }

    async deleteProjectById(projectId) {
        if (!projectId) {
          throw new Error("projectId is required");
        }
        return await this.projectRepository.delete({ where: { id: projectId } });
    }

    async updateProject(projectId, projectData) {
         if (!projectId || !projectData) {
           throw new Error("projectId and projectData are required");
         }

         if (typeof projectData !== "object") {
           throw new Error("projectData must be an object");
         }
        return await this.projectRepository.update({
            where: { id: projectId },
            data: {...projectData}
        })
    }
}

module.exports = ProjectService;