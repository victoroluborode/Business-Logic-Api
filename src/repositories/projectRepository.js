const BaseRepository = require("./baseRepository");


class ProjectRepository extends BaseRepository {
    constructor(organizationId) {
        super('Project', organizationId);
    }

    async findMany(args = {}) {
        const queryArgs = {
            ...args,
            where: {
                ...args.where,
                isDeleted: false
            }
        };
        
        return super.findMany(queryArgs);
    }
}

module.exports = ProjectRepository;