import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { Amplify, Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    userPoolId: process.env.NEXT_PUBLIC_AUTH_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_AUTH_WEB_CLIENT_ID,
  },
});
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        try {
          const user = await Auth.signIn(
            credentials.email,
            credentials.password
          );
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (e: any) {
          throw new Error(e.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/index",
  },
  secret: "gn2IAFNqDThBwJVVvqDct/KDhO9N7USXifHPa0AFo4o=",
  session: {
    //@ts-ignore
    jwt: true,
  },
  callbacks: {
    // Getting the JWT token from API response
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = { ...user };
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
