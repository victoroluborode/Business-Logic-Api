const BaseService = require("./baseService");


class RolePermissionService extends BaseService {
    constructor(organizationId) {
        super(organizationId)
    }

    async createRole(roleName, permissions) {
        if (!roleName || !permissions && !Array.isArray(permissions) || permissions.length === 0) {
            throw new Error(
              "Invalid input: roleName must be a string and permissions must be a non-empty array."
            );
        }

        const roleData = {
            name: roleName,
            permissions: permissions
        }
        return await this.rolePermissionRepository.create({data: roleData});
    }

    async assignRole(roleId, userId) {
        if (!userId || !roleId) {
            throw new Error("Both roleId and userId are required.");
        };

        return await this.runInTransaction(async (tx) => {
            const user = await this.userRepository.findUnique({ where: { id: userId } }, tx);
            if (!user) {
              throw new Error(`User with ID ${userId} does not exist`);
            }
            const role = await this.rolePermissionRepository.findUnique({ where: { id: roleId } }, tx);
             if (!role) {
               throw new Error(`Role with ID ${roleId} does not exist.`);
             }
            const updateUser = await this.userRepository.update({
                where: { id: userId },
                data: {roleId: roleId}
            }, tx)

            return updateUser;

        })
    }

    async checkPermission(userId, permission) {
        if (!userId || !permission) {
          throw new Error("Both userId and permission are required");
        }

        const user = await this.userRepository.findUnique({
            where: { id: userId },
            include: {role: true}
        });
            if (!user || !user.role) {
                return false;
            }

        const permissions = user.role.permissions;
            const hasPermission = permissions.includes(permission);
            return hasPermission;
        }
    }

// const createRole = async (roleName, permissions) => {
//     try {
//          if (
//            !roleName ||
//            (!permissions && !Array.isArray(permissions)) ||
//            permissions.length === 0
//          ) {
//            throw new Error(
//              "Invalid input: roleName must be a string and permissions must be a non-empty array."
//            );
//          }
        
//         const role = await prisma.role.create({
//           data: {
//             name: roleName,
//             permissions: permissions,
//           },
//         });

//         return role;
//     } catch (err) {
//         console.error("Error creating new role: ", err);
//         throw err;
//     }
// }

// const assignRole = async (roleId, userId) => {
//     try {
//         if (!userId || !roleId) {
//             throw new Error("Both roleId and userId are required.");
//         };

//         const user = await prisma.user.findUnique({
//             where: {id: userId}
//         })

//         if (!user) {
//             throw new Error(`User with ID ${userId} does not exist`);
//         }

//         const role = await prisma.role.findUnique({
//             where: {id: roleId}
//         })

//         if (!role) {
//             throw new Error(`Role with ID ${roleId} does not exist.`);
//         }

//         const updatedUser = await prisma.user.update({
//             where: { id: userId },
//             data: {
//                 roleId: roleId
//             }
//         })

//         return {
//           id: updatedUser.id,
//           name: updatedUser.name,
//           email: updatedUser.email,
//           organizationId: updatedUser.organizationId,
//           roleId: updatedUser.roleId,
//         };
//     } catch (err) {
//         console.error("Error assigning role to user: ", err);
//         throw err;
//     }
// }

// const checkPermission = async (userId, permission) => {
//     try {
//         if (!userId || !permission) {
//             throw new Error("Both userId and permission are required")
//         }

//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//             include: {role: true}
//         });

//         if (!user || !user.role) {
//             return false;
//         }

//         const permissions = user.role.permissions;
//         const hasPermission = permissions.includes(permission);
//         return hasPermission;

//     } catch (err) {
//         console.error(
//           `Error in checkPermission for userId=${userId}, permission=${permission}:`,
//           err
//         );
//         return false;
//     }
// }


module.exports = RolePermissionService;