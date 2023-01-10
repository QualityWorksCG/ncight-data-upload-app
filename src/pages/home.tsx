import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout/Layout";
import { PageWithLayout } from "../modules/Layout";
import Router from "next/router";
import { AuthenticateUser } from "../lib/ProtectedRoute";
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
        <VStack spacing={4}>
          <Box boxSize={["xs", "sm"]} mb={-20}>
            <Image src="/images/Home_Image.jpeg" alt="Dan Abramov" />
          </Box>
          <Heading color={"whiteAlpha.700"} textAlign={"center"}>
            Welcome to nCight!
          </Heading>
          <Text
            fontSize={["", "lg"]}
            color={"whiteAlpha.700"}
            textAlign={"center"}
          >
            We’re excited to have you on this journey to activate your data from
            a dormant liability into a revenue generating asset.
          </Text>
          <Text
            fontSize={["", "lg"]}
            color={"whiteAlpha.700"}
            textAlign={"center"}
          >
            You can now upload patient data to the nCight database, where we
            will store a de-identified copy of this data to provide insights
            previously unavailable to the market.
          </Text>
          <Text
            fontSize={["", "lg"]}
            color={"whiteAlpha.700"}
            textAlign={"center"}
          >
            Let’s continue!
          </Text>
          <Spacer />

          <Button
            w={["60%", "50%"]}
            variant={"custom"}
            onClick={() => {
              Router.push("/upload");
            }}
          >
            Add New Data
          </Button>
          <Button
            onClick={() => {
              Router.push("/uploads");
            }}
            w={["60%", "50%"]}
            variant={"custom"}
          >
            Data Upload Review
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

export async function getServerSideProps(context: any) {
  return await AuthenticateUser(context);
}
