import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/config.js';
import distRouter from './routes/distributorRoutes.js';
import DistributorController from './controller/DistributorController.js';

dotenv.config()
const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}));

(async () => {
    try {
        await connectDB(); // Establish the MongoDB connection
        app.use(express.json({ limit: "50mb", extended: true }));
        app.use(express.json());

        app.use('/api/dist', distRouter)

        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
})();
