import { AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Amplify } from "aws-amplify";
import { trpc } from "../utils/trpc";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { PageWithLayout } from "../modules/Layout";
import { customTheme } from "../styles/theme";
import "@fontsource/roboto-condensed/700.css";
import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  Amplify.configure({
    Auth: {
      userPoolId: process.env.NEXT_PUBLIC_AUTH_USER_POOL_ID,
      userPoolWebClientId: process.env.NEXT_PUBLIC_AUTH_WEB_CLIENT_ID,
    },
  });
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={customTheme}>
        <ColorModeScript
          initialColorMode={customTheme.config.initialColorMode}
        />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
