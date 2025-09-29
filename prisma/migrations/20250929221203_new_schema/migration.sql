/*
  Warnings:

  - You are about to drop the column `departmentId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectResource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_taskId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Department" DROP CONSTRAINT "Department_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Department" DROP CONSTRAINT "Department_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProjectResource" DROP CONSTRAINT "ProjectResource_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProjectResource" DROP CONSTRAINT "ProjectResource_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProjectResource" DROP CONSTRAINT "ProjectResource_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resource" DROP CONSTRAINT "Resource_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_departmentId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "departmentId",
ADD COLUMN     "isDeactivated" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."Comment";

-- DropTable
DROP TABLE "public"."Department";

-- DropTable
DROP TABLE "public"."ProjectResource";

-- DropTable
DROP TABLE "public"."Resource";
