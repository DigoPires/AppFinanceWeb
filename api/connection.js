import PG from "pg"

const { Pool } = PG;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

export default pool;