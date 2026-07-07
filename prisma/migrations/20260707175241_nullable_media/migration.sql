-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseMedia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "normalizedName" TEXT NOT NULL,
    "pattern" TEXT,
    "mediaType" TEXT,
    "mediaUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ExerciseMedia" ("createdAt", "id", "mediaType", "mediaUrl", "name", "normalizedName", "pattern", "updatedAt") SELECT "createdAt", "id", "mediaType", "mediaUrl", "name", "normalizedName", "pattern", "updatedAt" FROM "ExerciseMedia";
DROP TABLE "ExerciseMedia";
ALTER TABLE "new_ExerciseMedia" RENAME TO "ExerciseMedia";
CREATE UNIQUE INDEX "ExerciseMedia_normalizedName_key" ON "ExerciseMedia"("normalizedName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
