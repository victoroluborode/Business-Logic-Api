const BaseRepository = require("./baseRepository");

class ResourceRepository extends BaseRepository {
    constructor(organizationId) {
        super('Resource', organizationId)
    }

    async findMany(args = {}) {
        const queryArgs = {
            ...args,
            where: {
                ...args.where,
                isDeleted: false,
            }
        };
        return super.findMany(queryArgs);
    }
}

module.exports = ResourceRepository;