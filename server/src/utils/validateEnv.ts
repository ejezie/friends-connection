import { cleanEnv, str, port } from "envalid";

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production"],
    }),
    MONGODB_URL: str(),
    JWT_SECRET: str(),
    CLOUDINARY_NAME: str(),
    CLOUDINARY_KEY: str(),
    CLOUDINARY_SECRET: str(),
    PORT: port({ default: 8000 }),
  });
}

export default validateEnv;
