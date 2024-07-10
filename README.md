# Music Library for MMC

This project consists of a backend API and a frontend web application for a Music Library.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (Last Version)
- npm (usually comes with Node.js)
- Git
- Any SQL server a MusicLibrary database created. 

##Backend Setup
1. Clone the repository:
git clone https://github.com/Gherman-Andrei/mmc-project.git
cd mmc-project/backend

2. Install backend dependencies:
   npm install

3. Set up environment variables:
Create a `.env` file in the backend directory and add your database connection string:
DATABASE_URL="mysql://user:password@localhost:PORT/DatabaseName"

4. Run database migrations:
npm run migrate

5. Generate Prisma client:
npm run generate

### Running the Backend

To start the backend server in development mode with hot-reloading:
npm run dev

## Frontend Setup

1. Navigate to the frontend directory:
cd ../frontend

2. Install frontend dependencies:
npm install

### Running the Frontend

To start the frontend development server:
npm run dev

## Technologies Used

### Backend
- Node.js
- Express.js
- Prisma (ORM)
- MySQL

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios for API requests
