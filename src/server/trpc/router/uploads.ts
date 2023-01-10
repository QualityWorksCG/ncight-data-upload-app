import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const uploadsRouter = router({
  getByUserId: protectedProcedure
    .input(z.object({ UserId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.uploads.findMany({ where: { userId: input.UserId } });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.uploads.findMany();
  }),
});
