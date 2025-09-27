const BaseService = require("./baseService");

class TaskService extends BaseService {
    constructor(organizationId) {
        super(organizationId)
    }

    async createTask(taskData) {
        if (!taskData) {
          throw new Error("taskData is required");
        }

        if (typeof taskData !== "object") {
          throw new Error("taskData must be an object");
        }
        return await this.taskRepository.create({ data: taskData });
    }

    async getTaskById(taskId) {
        if (!taskId) {
          throw new Error("projectId is required");
        }
        return await this.taskRepository.findUnique({ where: { id: taskId } });
    }

    async getTasks(taskQuery) {
        if (!taskQuery) {
          throw new Error("taskQuery is required");
        }

        if (typeof taskQuery !== "object") {
          throw new Error("taskQuery must be an object");
        }
        return await this.taskRepository.findMany({ where: taskQuery });
    }

    async deleteTask(taskId) {
         if (!taskId) {
           throw new Error("projectId is required");
         }
        return await this.taskRepository.delete({ where: { id: taskId } });
    }

    async updateTask(taskId, taskData) {
        if (!taskId || !taskData) {
          throw new Error("taskId and taskData are required");
        }

        if (typeof taskData !== "object") {
          throw new Error("taskData must be an object");
        }
        return await this.taskRepository.update({
            where: { id: taskId },
            data: {...taskData}
        })
    }

}

module.exports = TaskService