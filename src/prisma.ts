import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var globalPrisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.globalPrisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.globalPrisma = prisma;


// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma  

