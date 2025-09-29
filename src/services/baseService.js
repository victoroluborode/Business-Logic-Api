const projectRepository = require("../repositories/projectRepository");
const taskRepository = require("../repositories/taskRepository");
const userRepository = require("../repositories/userRepository");
const organizationRepository = require("../repositories/organizationRepository");

class BaseService {
  constructor(organizationId) {
    this.projectRepository = new projectRepository(organizationId);
    this.taskRepository = new taskRepository(organizationId);
    this.userRepository = new userRepository(organizationId);
    this.organizationRepository = new organizationRepository(organizationId);
    this.organizationId = organizationId;
  }

  async runInTransaction(callback) {
    return this.projectRepository.runInTransaction(callback);
  }
}

module.exports = BaseService;
