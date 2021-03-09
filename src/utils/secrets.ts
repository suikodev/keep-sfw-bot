import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  console.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
}

export const ENVIRONMENT = process.env.NODE_ENV;

export const BOT_ADMIN = process.env["BOT_ADMIN"];

export const BOT_TOKEN = process.env["BOT_TOKEN"];

export const POSTGRES_URL = process.env["POSTGRES_URL"];

export const BOT_WEBHOOK_DOMAIN = process.env["BOT_WEBHOOK_DOMAIN"];
export const BOT_WEBHOOK_PORT = process.env["BOT_WEBHOOK_PORT"];

if (!BOT_TOKEN || !BOT_ADMIN) {
  console.error(
    "Please set BOT_TOKEN and BOT_ADMIN environment variable at least."
  );
  process.exit(1);
}
