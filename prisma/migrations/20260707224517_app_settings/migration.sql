-- CreateTable
CREATE TABLE "AppSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "registrationOpen" BOOLEAN NOT NULL DEFAULT true
);
