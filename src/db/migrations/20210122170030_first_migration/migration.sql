-- CreateTable
CREATE TABLE "NsfwFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileUniqueId" TEXT NOT NULL,
    "drawing" REAL NOT NULL,
    "hentai" REAL NOT NULL,
    "neutral" REAL NOT NULL,
    "porn" REAL NOT NULL,
    "sexy" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NsfwFile.fileUniqueId_unique" ON "NsfwFile"("fileUniqueId");
