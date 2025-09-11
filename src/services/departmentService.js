const prisma = require("../config/prismaClient");

const createDepartment = async (departmentName, organizationId, parentId) => {
  try {
    if (departmentName && organizationId) {
      const newDepartment = await prisma.department.create({
        data: {
          name: departmentName,
          organizationId: organizationId,
          parentId: parentId,
        },
      });
      return newDepartment;
    } else {
      throw new Error("Department name and organization ID are required.");
    }
  } catch (err) {
    console.error(err);
  }
};

const getDepartmentHierarchy = async (organizationId) => {
  try {
    const departments = await prisma.department.findMany({
        where: { organizationId: organizationId },
        orderBy: {name: 'asc'}
    });

    const departmentMap = {};
    const tree = [];

      departments.forEach(department => {
          departmentMap[department.id] = { ...department, children: [] };
          if (!department.parentId) {
              tree.push(departmentMap[department.id]);
          }
      });

      departments.forEach(department => {
          if (department.parentId && departmentMap[department.parentId]) {
              departmentMap[department.parentId].children.push(departmentMap[department.id]);
          }
      });

      return tree;
  } catch (err) {
    console.error("Error fetching department hierarchy:", err);
    throw err;
  }
};

module.exports = {
  createDepartment,
  getDepartmentHierarchy,
};
