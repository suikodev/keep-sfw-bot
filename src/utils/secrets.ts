import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  console.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
}
