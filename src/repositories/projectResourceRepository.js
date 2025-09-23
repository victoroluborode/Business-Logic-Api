const BaseRepository = require("./baseRepository");

class ProjectResourceRepository extends BaseRepository {
  constructor(organizationId) {
    super("ProjectResource", organizationId);
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

module.exports = ProjectResourceRepository;