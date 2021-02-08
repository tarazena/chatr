import { PrismaClient } from "@prisma/client";
import { Request } from "express";

export interface Context {
  db: PrismaClient;
  request: Request;
}
