import express from 'express';
import connectDB from "./config/dbConfig.js";
import bodyParser from "body-parser";
import artistRoutes from "./routes/artistRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import songRoutes from "./routes/songRoutes.js";

const app = express();
app.use(bodyParser.json());

app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/songs', songRoutes);

connectDB();

export default app;