const BaseRepository = require("./baseRepository");

class organizationRepository extends BaseRepository {
    constructor() {
        super('Organization', null)
    }

    async findMany(args = {}) {
        const queryArgs = {
            ...args,
            where: {
                ...args.where,
                isDeleted: false
            }
        }
        return super.findMany(queryArgs);
    }
}

module.exports = organizationRepository;