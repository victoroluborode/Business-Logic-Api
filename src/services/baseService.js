const projectRepository = require("../repositories/projectRepository");
const taskRepository = require("../repositories/taskRepository");
const userRepository = require("../repositories/userRepository");
const organizationRepository = require("../repositories/organizationRepository");
const rolePermissionRepository = require("../repositories/rolePermissionRepository");

class BaseService {
  constructor(organizationId) {
    this.projectRepository = new projectRepository(organizationId);
    this.taskRepository = new taskRepository(organizationId);
    this.userRepository = new userRepository(organizationId);
    this.organizationRepository = new organizationRepository(null);
    this.rolePermissionRepository = new rolePermissionRepository(null);
    this.organizationId = organizationId;
  }

  async runInTransaction(callback) {
    return this.projectRepository.runInTransaction(callback);
  }
}

module.exports = BaseService;
