import { ClassifiedFile } from "../entities/ClassifiedFile";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { POSTGRES_URL } from "./secrets";

export const createDBConnection = async (): Promise<Connection> => {
  let connectionOptions: ConnectionOptions;
  if (POSTGRES_URL) {
    connectionOptions = {
      type: "postgres",
      url: POSTGRES_URL,
    };
  } else {
    connectionOptions = {
      type: "better-sqlite3",
      database: "./bot.db",
    };
  }
  return await createConnection({
    ...connectionOptions,
    entities: [ClassifiedFile],
    synchronize: true,
  });
};
