import express from 'express';
import connectDB from "./config/dbConfig.js";
import bodyParser from "body-parser";
import artistRoutes from "./routes/artistRoutes.js";

const app = express();
app.use(bodyParser.json());

app.use('/api/artists', artistRoutes);

connectDB();

export default app;