import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout/Layout";
import { PageWithLayout } from "../modules/Layout";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { withSSRContext } from "aws-amplify";
import Router from "next/router";
type Props = {};

const Home: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.md" pt={8}>
        <VStack>
          <Box boxSize={["xs", "sm"]} mb={-20}>
            <Image src="/images/Home_Image.jpeg" alt="Dan Abramov" />
          </Box>
          <Heading size={"lg"} color={"whiteAlpha.700"} textAlign={"center"}>
            nCight is focused on helping independent Orthopedic Surgeons
            maintain their autonomy.
          </Heading>
          <Spacer />
          <Heading color={"secondary.yellow"} size={"lg"} textAlign={"center"}>
            Get paid to share scope images.
          </Heading>
          <Button
            w={["60%", "50%"]}
            variant={"custom"}
            onClick={() => {
              Router.push("/upload");
            }}
          >
            Upload Images
          </Button>
        </VStack>
      </Container>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
