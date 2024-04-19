// import { PrismaClient } from '@prisma/client'

// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }

// declare global {
//   var prismaGlobal: ReturnType<typeof prismaClientSingleton>
// }

// export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// if (process.env.NODE_ENV !== 'development') globalThis.prismaGlobal = prisma


import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma  

