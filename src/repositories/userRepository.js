const BaseRepository = require("./baseRepository");

class UserRepository extends BaseRepository {
    constructor(organizationId) {
        super('User', organizationId)
    }

    async findMany(args = {}) {
        const queryArgs = {
            ...args,
            where: {
                ...args.where,
                isDeactivated: false,
            }
        }

        return super.findMany(queryArgs);
    }

    async deactivate(userId) {
        return super.update({id: userId}, {isDeactivated: true})
    }
}

module.exports = UserRepository;