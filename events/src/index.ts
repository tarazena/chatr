/** Setup envs for local development */

import { Client } from "pg";

import PostgresPubSub from "./util/pgPubSub/PostgresPubSub";

/** Instantiate Apollo Server */
async function server() {
  // create your postgres client and connect to the database
  const pgClient = new Client({ connectionString: process.env.DATABASE_URL });
  await pgClient.connect();

  // Instantiate your PubSub engine
  const pubSub = new PostgresPubSub(pgClient);

  pubSub.subscribe("MESSAGE CREATED", () => {
    console.log("EVENTS BABY");
  });

  console.log('EVENTS READY')
}

try {
  server();
} catch (e) {
  throw e;
}
