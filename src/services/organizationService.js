const prisma = require("../config/prismaClient");


const getOrganizationSettings = async (organizationId) => {
    try {
        if (!organizationId) {
            throw new Error("OrganizationId is required");
        }
        
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId }
        });

        return organization;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const updateOrganizationSettings = async (organizationId, data) => {
    try {
        if (!organizationId || !data) {
            throw new Error("OrganizationId and data are required");
        }

        if (typeof (data) !== "object") {
            throw new Error("Data must be an object");
        }

        const updatedOrganization = await prisma.organization.update({
            where: { id: organizationId },
            data: data
        });

        return updatedOrganization;

    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {getOrganizationSettings, updateOrganizationSettings}