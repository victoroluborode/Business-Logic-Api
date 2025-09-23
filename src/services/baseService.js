const projectRepository = require("../repositories/projectRepository");
const commentRepository = require("../repositories/commentRepository");
const resourceRepository = require("../repositories/resourceRepository");
const taskRepository = require("../repositories/taskRepository");
const userRepository = require("../repositories/userRepository");
const projectResourceRepository = require("../repositories/projectResourceRepository");

class BaseService {
    constructor(organizationId) {
        this.projectRepository = new projectRepository(organizationId);
        this.commentRepository = new commentRepository(organizationId);
        this.resourceRepository = new resourceRepository(organizationId);
        this.taskRepository = new taskRepository(organizationId);
        this.userRepository = new userRepository(organizationId);
        this.projectResourceRepository = new projectResourceRepository(organizationId);
        this.organizationId = organizationId;
    }

    async runInTransaction(callback) {
        return this.projectRepository.runInTransaction(callback);   
    }
}

module.exports = BaseService;