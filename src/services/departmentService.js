const BaseService = require("./baseService");

class DepartmentService extends BaseService {
  constructor(organizationId) {
    super(organizationId)
  }
  async createDepartment(departmentData) {
    if (!departmentData) {
      throw new Error("departmentData is required");
    }
    return await this.departmentRepository.create({data: departmentData})
  }

  async getDepartmentHierarchy() {
    const departments = this.departmentRepository.findMany({
      where: {},
      orderBy: {name: 'asc'}
    });

    const departmentMap = {};
    const tree = [];

    departments.forEach((department) => {
      departmentMap[department.id] = { ...department, children: [] };
      if (!department.parentId) {
        tree.push(departmentMap[department.id]);
      }
    });

    departments.forEach((department) => {
      if (department.parentId && departmentMap[department.parentId]) {
        departmentMap[department.parentId].children.push(
          departmentMap[department.id]
        );
      }
    });

    return tree;

  }
}


module.exports = DepartmentService;
