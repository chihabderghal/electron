import { DataSource } from "typeorm";
import { User } from "./entities/User.js";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./gestauto-dev.sqlite3",
    synchronize: true,
    entities: [User],
    migrations: [],
})