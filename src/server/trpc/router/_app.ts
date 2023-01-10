import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { uploadsRouter } from "./uploads";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  upload: uploadsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
