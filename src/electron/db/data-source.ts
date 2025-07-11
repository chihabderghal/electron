import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import path from "path";
import { isDev } from "../main/index.js";
import { app } from "electron";

const dbPath = isDev() ? './gestauto-dev.sqlite3' : path.join(app.getPath('userData'), 'gestauto.sqlite3')

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: dbPath,
    synchronize: true,
    entities: [User],
    migrations: [],
})