

# Mathmaster

Mathmaster is an interactive math learning website tailored for Bangladeshi students. It provides various modules for different user roles, allowing students to view and enroll in courses, learn via interactive elements, give quizzes, and access a dictionary. Authors can create and manage courses, while moderators review and accept changes submitted by authors. Admins have access to site-wide statistics.

## Features

### Student Module
- View different course landing pages with previous enrollments and ratings.
- Enroll in courses.
- Learn courses via interactive elements.
- Take quizzes.
- Access a dictionary.

### Author Module
- Create courses.
- Edit or add topics and lessons to a course.
- Submit changes to moderators.

### Moderator Module
- Review changes submitted by authors.
- Accept or decline changes with feedback.

### Admin Module
- View site-wide statistics.

## Technologies Used
- Express for backend.
- PostgreSQL as the database.
- Prisma ORM for SQL queries.
- JWT token for role-based authentication.
- ESLint for linting.

## Installation and Configuration
1. Download the project and unzip it.
2. Navigate to the server folder:
   ```bash
   cd server
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the proper database URL and JWT secret (message if needed):
   ```bash
   touch .env
   ```
5. Run the project:
   ```bash
   npm run dev
   ```

## Authentication
JWT token is used for role-based authentication with four types of users:
1. Basic User: API access to view, enroll, and rate courses and course contents.
2. Author: API access to all privileges of a basic user and to modify/create course and course contents and submit changes as tickets to moderators.
3. Moderator: API access to all privileges of a basic user and to review change tickets and accept the changes or decline with feedback.
4. Admin: API access of basic user and site-wide statistics.

## Directory System
All contents such as lessons and dictionaries are saved in different files in a central file system on the server. Primarily, `.txt` files are used for this purpose for variable size file lengths.

## Contact Information
LinkedIn: [Shariful Islam](https://www.linkedin.com/in/shariful-islam-buet/)

