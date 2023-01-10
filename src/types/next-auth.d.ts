import { type DefaultSession } from "next-auth";
import { CognitoUser } from "../modules/CognitoUser";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"] &
      CognitoUser;
  }
}
