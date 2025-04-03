/*
  Warnings:

  - A unique constraint covering the columns `[role_id,email]` on the table `auth_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "auth_user_role_id_email_key" ON "auth_user"("role_id", "email");
