import PostgresPubSub from "./PostgresPubSub";
import { Client } from "pg";

// create your postgres client and connect to the database
const pgClient = new Client({ connectionString: process.env.DATABASE_URL });
pgClient.connect();

// Instantiate your PubSub engine
export const pubSub = new PostgresPubSub(pgClient);
