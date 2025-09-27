const BaseRepository = require("./baseRepository");

class DepartmentRepository extends BaseRepository {
  constructor(organizationId) {
    super("Department", organizationId);
  }

  async findMany(args = {}) {
    const queryArgs = {
      ...args,
      where: {
        ...args.where,
        isDeleted: false,
      },
    };

    return super.findMany(queryArgs);
  }
}

module.exports = DepartmentRepository;
