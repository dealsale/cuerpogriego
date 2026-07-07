-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "age" INTEGER,
    "sex" TEXT,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "goal" TEXT,
    "level" TEXT NOT NULL DEFAULT 'Principiante',
    "daysPerWeek" INTEGER NOT NULL DEFAULT 4,
    "hasInjury" BOOLEAN,
    "injuriesJson" TEXT NOT NULL DEFAULT '[]',
    "injuryDesc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "daysPerWeek" INTEGER NOT NULL,
    "durationEstimate" TEXT NOT NULL,
    "intensity" TEXT NOT NULL,
    "warningsJson" TEXT NOT NULL DEFAULT '[]',
    "recommendationsJson" TEXT NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutineDay" (
    "id" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "focus" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "RoutineDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutineExercise" (
    "id" TEXT NOT NULL,
    "routineDayId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "reps" TEXT NOT NULL,
    "rest" TEXT NOT NULL,
    "note" TEXT,
    "pattern" TEXT NOT NULL,
    "musclesJson" TEXT NOT NULL DEFAULT '[]',
    "musclesSecJson" TEXT NOT NULL DEFAULT '[]',
    "techniqueJson" TEXT NOT NULL DEFAULT '[]',
    "mistakesJson" TEXT NOT NULL DEFAULT '[]',
    "tempo" TEXT NOT NULL,
    "breathing" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "RoutineExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "calories" TEXT NOT NULL,
    "water" TEXT NOT NULL,
    "recommendationsJson" TEXT NOT NULL DEFAULT '[]',
    "tipsJson" TEXT NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "dietId" TEXT NOT NULL,
    "moment" TEXT NOT NULL,
    "optionsJson" TEXT NOT NULL DEFAULT '[]',
    "note" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WeightLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyMeasurement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chest" TEXT NOT NULL DEFAULT '',
    "waist" TEXT NOT NULL DEFAULT '',
    "arm" TEXT NOT NULL DEFAULT '',
    "leg" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BodyMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressPhoto" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgressPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseMedia" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normalizedName" TEXT NOT NULL,
    "pattern" TEXT,
    "mediaType" TEXT,
    "mediaUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "registrationOpen" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AppSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Routine_userId_key" ON "Routine"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Diet_userId_key" ON "Diet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BodyMeasurement_userId_key" ON "BodyMeasurement"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressPhoto_userId_slot_key" ON "ProgressPhoto"("userId", "slot");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseMedia_normalizedName_key" ON "ExerciseMedia"("normalizedName");

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineDay" ADD CONSTRAINT "RoutineDay_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_routineDayId_fkey" FOREIGN KEY ("routineDayId") REFERENCES "RoutineDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightLog" ADD CONSTRAINT "WeightLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyMeasurement" ADD CONSTRAINT "BodyMeasurement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressPhoto" ADD CONSTRAINT "ProgressPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
