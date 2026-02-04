import PG from "pg";
import "dotenv/config";

const { Pool, types } = PG;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;