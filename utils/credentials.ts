import dotenv from "dotenv";

if (!process.env.CI) {
  dotenv.config();
}

const username = process.env.STANDARD_USER_USERNAME;
const password = process.env.STANDARD_USER_PASSWORD;

if (!username || !password) {
  throw new Error(
    "Missing credentials: STANDARD_USER_USERNAME and STANDARD_USER_PASSWORD must be set in .env (local) or as environment variables (CI)"
  );
}

export const credentials = {
  standardUser: { username, password },
};
