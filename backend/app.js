import express from 'express';
import connectDB from "./config/dbConfig.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

connectDB();

export default app;