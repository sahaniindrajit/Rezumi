import { drizzle } from 'drizzle-orm/node-postgres';
import pg, { Pool } from 'pg';

import * as schema from './schema';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
    conn: pg.Client | undefined;
};

const conn = globalForDb.conn ?? new pg.Client(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn;

//use this to query the database
export const db = drizzle(
    new Pool({
        connectionString: process.env.DATABASE_URL!,
    }),
    { schema }
);
