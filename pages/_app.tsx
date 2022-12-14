import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "@fontsource/roboto-condensed/700.css";
import { customTheme } from "../styles/theme";
import { PageWithLayout } from "../modules/Layout";
import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../context/AuthContext";
type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  Amplify.configure({
    Auth: {
      userPoolId: process.env.NEXT_PUBLIC_AUTH_USER_POOL_ID,
      userPoolWebClientId: process.env.NEXT_PUBLIC_AUTH_WEB_CLIENT_ID,
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
