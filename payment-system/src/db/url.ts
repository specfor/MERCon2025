export function getDatabaseUrl(): string {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const name = process.env.DB_NAME;

  if (!user || !password || !host || !port || !name) {
    throw new Error("Missing one or more database environment variables (DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME).");
  }

  return `mysql://${user}:${password}@${host}:${port}/${name}`;
}
