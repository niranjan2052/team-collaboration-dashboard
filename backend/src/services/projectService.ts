// src/services/projectService.ts
import { prisma } from "../config/db.js";
import ActivityLog from "../mongo/activityLogModel.js";

export const getProjects = async (userId: string) => {
  return prisma.projects.findMany({
    where: {
      project_members: {
        some: { user_id: userId }
      }
    }
  });
};

export const createProject = async (data: any, userId: string) => {
  return prisma.projects.create({
    data: {
      name: data.name,
      description: data.description,
      owner_id: userId,
      project_members: {
        create: { user_id: userId, role: "OWNER" }
      },
      task_columns: {
        create: [
          { name: "To Do", position: 1 },
          { name: "In Progress", position: 2 },
          { name: "Done", position: 3 }
        ]
      }
    }
  });
};

export const getProjectById = async (projectId: string) => {
  const project = await prisma.projects.findUnique({
    where: { id: projectId },
    include: {
      task_columns: {
        orderBy: { position: "asc" },
        include: {
          tasks: { orderBy: { position: "asc" } }
        }
      }
    }
  });

  if (!project) throw new Error("Project not found");
  return project;
};

export const updateProject = async (projectId: string, data: any) => {
  return prisma.projects.update({
    where: { id: projectId },
    data
  });
};

export const deleteProject = async (projectId: string) => {
  await prisma.projects.delete({ where: { id: projectId } });
};

export const addMember = async (projectId: string, data: any) => {
  return prisma.project_members.create({
    data: {
      project_id: projectId,
      user_id: data.userId,
      role: data.role || "MEMBER"
    }
  });
};
