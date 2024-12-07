/**
 * ! Executing this script will delete all data in your database and seed it with 10 preference.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { SeedClient, createSeedClient } from "@snaplet/seed";
import { randomInt } from "crypto";
import {
  PrismaClient,
  User
} from ".prisma/client";

import { devUsers } from "./seeders/users.seed";



async function main() {
  const seed = await createSeedClient();
  const prisma = new PrismaClient();

  // If the environment is not release, reset the database and seed it

  await seed.user(devUsers.map(user => ({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdBy: user.createdBy,
    updatedBy: user.updatedBy
  })));
  console.log("Database seeded successfully!");
  process.exit();
  
  }






main();
