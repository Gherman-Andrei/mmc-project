import express from 'express';
import connectDB from "./config/dbConfig.js";

const app = express();


connectDB();

export default app;