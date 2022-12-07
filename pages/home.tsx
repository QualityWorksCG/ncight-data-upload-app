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

type Props = {};

const Home: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.md">
        <VStack>
          <Box boxSize="sm">
            <Image
              borderRadius={"lg"}
              src="https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Dan Abramov"
            />
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
            borderRadius={"full"}
            bg={"secondary.yellow"}
            color={"white"}
            _hover={{ backgroundColor: "secondary.yellow_light" }}
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
