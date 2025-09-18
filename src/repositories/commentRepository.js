const BaseRepository = require("./baseRepository");

class CommentRepository extends BaseRepository {
    constructor(organizationId) {
        super('Comment', organizationId);
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

module.exports = CommentRepository;