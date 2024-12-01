import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URL,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})

