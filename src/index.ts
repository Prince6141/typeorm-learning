import "reflect-metadata";
import express, { Express } from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { AppDataSource } from "./data-source";

dotenv.config();

const startServer = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");

        const app: Express = express();

        // Middleware
        app.use(express.json());
        app.use(helmet());
        app.use(cors());

        // Routes
        app.use('/api/users', userRouter);

        // Error handling
        app.use(notFoundHandler);
        app.use(errorHandler);

        // Start express server
        const PORT: number = parseInt(process.env.PORT || "8080", 10);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error during server startup:", error);
        process.exit(1);
    }
};

startServer().catch((error) => {
    console.error("Unhandled error during server startup:", error);
    process.exit(1);
});

