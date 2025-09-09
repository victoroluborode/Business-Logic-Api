const Organization = {
    id: 'string (UUID)',
    name: 'string',
    createdAt: 'datetime',
    updatedAt: 'datetime'
};

const User = {
  id: "string (UUID)",
  name: "string",
  email: "string (unique)",
  passwordHash: "string",
  role: "enum (Admin, Member)",
  organizationId: "string (UUID)", 
  createdAt: "datetime",
  updatedAt: "datetime",
};

const Project = {
  id: "string (UUID)", 
  name: "string",
  description: "string",
  status: "enum (Active, Completed)",
  organizationId: "string (UUID)",
  createdAt: "datetime",
  updatedAt: "datetime",
};

const Resource = {
  id: "string (UUID)",
  name: "string",
  type: "enum (Human, Equipment)",
  availability: "enum (Available, Busy)",
  organizationId: "string (UUID)", 
  createdAt: "datetime",
  updatedAt: "datetime",
};

const ProjectResource = {
  projectId: "string (UUID)", 
  resourceId: "string (UUID)", 
  organizationId: "string (UUID)",
  assignmentDate: "datetime",
};

module.exports = {Organization, User, Project, Resource, ProjectResource}