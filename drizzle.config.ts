import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig(
  process.env.NODE_ENV === "development"
    ? {
        dialect: "sqlite",
        schema: "./db/schema.ts",
        out: "./drizzle",
        dbCredentials: {
          url: "file:test.db",
        },
      }
    : {
        dialect: "sqlite",
        schema: "./db/schema.ts",
        out: "./drizzle",
        driver: "turso",
        dbCredentials: {
          url: process.env.TURSO_DATABASE_URL!,
          authToken: process.env.TURSO_AUTH_TOKEN,
        },
      }
);
