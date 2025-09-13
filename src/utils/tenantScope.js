const prisma = require("../config/prismaClient");

const whereOperations = ["findFirst", "findUnique", "update", "findMany", "delete", "updateMany", "deleteMany", "upsert", "count", "aggregate", "groupBy"];
const dataOperations = ["create", "createMany"];

const enforceTenantScope = async (operation, modelName, args, organizationId) => {
    try {
        if (!args || args.constructor !== Object) {
            throw new Error("args must be an object");  
        }

        if (whereOperations.includes(operation)) {
            // eslint-disable-next-line no-unused-vars
            const { organizationId: _ignored, ...restwhere } = args.where || {};
                const scopedArgs = {
                  ...args,
                  where: { ...restwhere, organizationId: organizationId },
                };
                const result = await prisma[modelName][operation](scopedArgs);
                return result;
        }

        if (dataOperations.includes(operation)) {
            // eslint-disable-next-line no-unused-vars
            const { organizationId: _ignored, ...restdata } = args.data || {};
            const scopedArgs = {
                ...args,
                data: { ...restdata, organizationId: organizationId },
            };
            const result = await prisma[modelName][operation](scopedArgs);
            return result;
        }

        throw new Error(
          `Operation "${operation}" not supported in enforceTenantScope`
        );

    } catch (err) {
        console.log("Error enforcing tenant scope:", err);
        throw err;
    }
}
    

module.exports = { enforceTenantScope };