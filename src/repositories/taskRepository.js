const BaseRepository = require("./baseRepository");

class TaskRepository extends BaseRepository {
    constructor(organizationId) {
        super('Task', organizationId);
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

module.exports = TaskRepository;