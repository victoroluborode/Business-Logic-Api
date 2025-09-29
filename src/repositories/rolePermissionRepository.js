const BaseRepository = require("./baseRepository");

class RolePermissionRepository extends BaseRepository {
  constructor() {
    super("Role", null);
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

module.exports = RolePermissionRepository;