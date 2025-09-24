const BaseService = require("./baseService");

class TaskService extends BaseService {
    constructor(organizationId) {
        super(organizationId)
    }

    async createTask(taskData) {
        return await this.taskRepository.create({ data: taskData });
    }

    async getTaskById(taskId) {
        return await this.taskRepository.findUnique({ where: { id: taskId } });
    }

    async getTasks(taskQuery) {
        return await this.taskRepository.findMany({ where: taskQuery });
    }

    async deleteTask(taskId) {
        return await this.taskRepository.delete({ where: { id: taskId } });
    }

    async updateTask(taskId, taskData) {
        return await this.taskRepository.update({
            where: { id: taskId },
            data: {...taskData}
        })
    }

}

module.exports = TaskService