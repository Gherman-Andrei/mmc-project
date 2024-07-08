import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function connectDB() {
    try {
        await prisma.$connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection failed: ', err.message);
    }
}

export default connectDB;