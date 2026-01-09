import dotenv from "dotenv";

// Only load .env file when running locally (not in CI)
if (!process.env.CI) {
  dotenv.config();
  console.log("Loading credentials from .env file (local environment)");
} else {
  console.log("Using credentials from environment variables (CI environment)");
}

export const credentials = {
  standardUser: {
    username: process.env.STANDARD_USER_USERNAME || "",
    password: process.env.STANDARD_USER_PASSWORD || "",
  },
};
