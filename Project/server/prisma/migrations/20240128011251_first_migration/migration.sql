-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "DOB" TIMESTAMP(3) NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "course_type" (
    "course_type_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "picture" TEXT,

    CONSTRAINT "course_type_pkey" PRIMARY KEY ("course_type_id")
);

-- CreateTable
CREATE TABLE "course_level" (
    "course_level_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "course_level_pkey" PRIMARY KEY ("course_level_id")
);

-- CreateTable
CREATE TABLE "course" (
    "course_id" SERIAL NOT NULL,
    "picture" TEXT,
    "level_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "estimated_time" INTEGER NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "language" (
    "language_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("language_id")
);

-- CreateTable
CREATE TABLE "course_content" (
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "course_content_pkey" PRIMARY KEY ("course_id","language_id")
);

-- CreateTable
CREATE TABLE "author" (
    "content_author_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("content_author_id")
);

-- CreateTable
CREATE TABLE "lesson_author" (
    "author_id" INTEGER NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "abstraction_level_id" INTEGER NOT NULL,

    CONSTRAINT "lesson_author_pkey" PRIMARY KEY ("author_id","lesson_id","language_id","abstraction_level_id")
);

-- CreateTable
CREATE TABLE "prerequisite_course" (
    "course_id" INTEGER NOT NULL,
    "prerequisite_id" INTEGER NOT NULL,

    CONSTRAINT "prerequisite_course_pkey" PRIMARY KEY ("course_id","prerequisite_id")
);

-- CreateTable
CREATE TABLE "topic" (
    "topic_id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "topic_pkey" PRIMARY KEY ("topic_id")
);

-- CreateTable
CREATE TABLE "topic_content" (
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "topic_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "topic_content_pkey" PRIMARY KEY ("topic_id","language_id")
);

-- CreateTable
CREATE TABLE "abstraction_level" (
    "abstraction_level_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "abstraction_level_pkey" PRIMARY KEY ("abstraction_level_id")
);

-- CreateTable
CREATE TABLE "lesson" (
    "lesson_id" SERIAL NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "XP" INTEGER NOT NULL,

    CONSTRAINT "lesson_pkey" PRIMARY KEY ("lesson_id")
);

-- CreateTable
CREATE TABLE "lesson_content" (
    "lesson_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "language_id" INTEGER NOT NULL,
    "abstraction_level_id" INTEGER NOT NULL,

    CONSTRAINT "lesson_content_pkey" PRIMARY KEY ("lesson_id","language_id","abstraction_level_id")
);

-- CreateTable
CREATE TABLE "definition" (
    "definition_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "definition_pkey" PRIMARY KEY ("definition_id")
);

-- CreateTable
CREATE TABLE "quiz" (
    "quiz_id" SERIAL NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "XP" INTEGER NOT NULL,
    "Total_score" INTEGER NOT NULL,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("quiz_id")
);

-- CreateTable
CREATE TABLE "quiz_content" (
    "quiz_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "quiz_content_pkey" PRIMARY KEY ("quiz_id","language_id")
);

-- CreateTable
CREATE TABLE "enrolled_courses" (
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enrolled_courses_pkey" PRIMARY KEY ("user_id","course_id")
);

-- CreateTable
CREATE TABLE "completed_lessons" (
    "user_id" INTEGER NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER,
    "feedback" TEXT,

    CONSTRAINT "completed_lessons_pkey" PRIMARY KEY ("user_id","lesson_id")
);

-- CreateTable
CREATE TABLE "completed_quizzes" (
    "user_id" INTEGER NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,
    "XP" INTEGER NOT NULL,

    CONSTRAINT "completed_quizzes_pkey" PRIMARY KEY ("user_id","quiz_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "course_type_name_key" ON "course_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "course_level_name_key" ON "course_level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "language_name_key" ON "language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "course_content_name_key" ON "course_content"("name");

-- CreateIndex
CREATE UNIQUE INDEX "author_user_id_key" ON "author"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "topic_course_id_topic_id_key" ON "topic"("course_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "abstraction_level_name_key" ON "abstraction_level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "definition_name_key" ON "definition"("name");

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "course_level"("course_level_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "course_type"("course_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course_content" ADD CONSTRAINT "course_content_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course_content" ADD CONSTRAINT "course_content_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "author_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesson_author" ADD CONSTRAINT "lesson_author_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("content_author_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesson_author" ADD CONSTRAINT "lesson_author_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("lesson_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesson_author" ADD CONSTRAINT "lesson_author_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesson_author" ADD CONSTRAINT "lesson_author_abstraction_level_id_fkey" FOREIGN KEY ("abstraction_level_id") REFERENCES "abstraction_level"("abstraction_level_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prerequisite_course" ADD CONSTRAINT "prerequisite_course_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "topic_content" ADD CONSTRAINT "topic_content_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("topic_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "topic_content" ADD CONSTRAINT "topic_content_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("topic_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesson_content" ADD CONSTRAINT "lesson_content_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("lesson_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesson_content" ADD CONSTRAINT "lesson_content_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesson_content" ADD CONSTRAINT "lesson_content_abstraction_level_id_fkey" FOREIGN KEY ("abstraction_level_id") REFERENCES "abstraction_level"("abstraction_level_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "definition" ADD CONSTRAINT "definition_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("topic_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz_content" ADD CONSTRAINT "quiz_content_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("quiz_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz_content" ADD CONSTRAINT "quiz_content_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrolled_courses" ADD CONSTRAINT "enrolled_courses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrolled_courses" ADD CONSTRAINT "enrolled_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "completed_lessons" ADD CONSTRAINT "completed_lessons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "completed_lessons" ADD CONSTRAINT "completed_lessons_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("lesson_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "completed_quizzes" ADD CONSTRAINT "completed_quizzes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "completed_quizzes" ADD CONSTRAINT "completed_quizzes_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("quiz_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
