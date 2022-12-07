import type { AppProps } from "next/app";
import Head from "next/head";
import { Amplify } from "aws-amplify";
import useEnv from "../lib/useEnv";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "@fontsource/roboto-condensed/700.css";
import { customTheme } from "../styles/theme";
import { PageWithLayout } from "../modules/Layout";
import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { env } = useEnv();
  if (!env) return <>No Env Loading...</>;

  Amplify.configure({
    Auth: {
      userPoolId: env.cognitoUserPoolId,
      userPoolWebClientId: env.cognitoUserPoolWebClientId,
    },
  });
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <ColorModeScript
          initialColorMode={customTheme.config.initialColorMode}
        />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </>
  );
}

export default MyApp;
