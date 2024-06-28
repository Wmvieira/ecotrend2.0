import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const searchRouter = createTRPCRouter({
  searchTips: publicProcedure
    .input(z.object({
      query: z.string().min(1),  // Assegura que a entrada não esteja vazia
      page: z.number().default(1),
      limit: z.number().default(5)
    }))
    .query(async ({ input }) => {
      const { query, page, limit } = input;
      const offset = (page - 1) * limit;
      const results = await prisma.tip.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive'
              }
            },
            {
              category: {
                some: {
                  name: {
                    contains: query,
                    mode: 'insensitive'
                  }
                }
              }
            }
          ]
        },
        include: {
          category: true  // Inclui detalhes da categoria
        },
        skip: offset,
        take: limit
      });

      return results;
    })
});
