import Router from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { Auth } from "aws-amplify";
import { CognitoUser } from "../modules/CognitoUser";

const fetcher = async () => {
  return Auth.currentAuthenticatedUser();
};

export default function useUser({ redirect = "" } = {}) {
  const { cache } = useSWRConfig();
  const { data, error } = useSWR("user", fetcher);

  const user: CognitoUser = data;
  const loading = !user && !error;
  const loggedOut = error && error === "The user is not authenticated";

  if (loggedOut && redirect) {
    Router.push("/home");
  }

  const signOut = async () => {
    cache.delete("user");
    await Auth.signOut();
    await Router.push("/");
  };

  return { loading, loggedOut, user, signOut };
}
