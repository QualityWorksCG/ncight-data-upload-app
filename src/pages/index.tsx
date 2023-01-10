import type { NextPage } from "next";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import {
  Flex,
  Stack,
  HStack,
  Image,
  Show,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
  Container,
  Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: user, status } = useSession();
  const [loginErrorObject, showLoginError] = useState({
    isError: false,
    errorMessage: "",
  });

  console.log(user, status);

  useEffect(() => {
    if (user && status === "authenticated") {
      Router.push("/home");
    }
  }, [status === "authenticated" && user]);

  if (status === "loading") {
    return (
      <Center h={"100vh"}>
        <Spinner color="yellow" />
      </Center>
    );
  }
  return (
    <>
      <Show below="lg">
        <Container minW={"100%"} bg="secondary.yellow" centerContent={true}>
          <Flex>
            <Link
              pt={"2.5"}
              pb={"2.5"}
              color="white"
              href="https://www.ncight.com/how-it-works"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <InfoOutlineIcon color="white" marginRight={"2.5"} /> Learn More
              About nCight
            </Link>
          </Flex>
        </Container>
      </Show>
      {!user && status === "unauthenticated" && (
        <Stack
          minH={"100vh"}
          direction={{ base: "column", md: "row" }}
          bg="background.main"
        >
          <Show above="lg">
            <Stack w={"2xl"}>
              <Container
                height={"50px"}
                minW={"100%"}
                bg="secondary.yellow"
                mb={-3}
                centerContent={true}
              >
                <Flex>
                  <Link
                    pt={"2.5"}
                    pb={"2.5"}
                    color="white"
                    href="https://www.ncight.com/how-it-works"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <InfoOutlineIcon color="white" marginRight={"2.5"} /> Learn
                    More About nCight
                  </Link>
                </Flex>
              </Container>
              <Flex flex={1}>
                <Image
                  alt={"Sign up Image"}
                  objectFit={"cover"}
                  height={"100%"}
                  src={
                    //'https://drive.google.com/uc?id=10o5dt6LjNRdlLkjepmKK9ALU4Y1epgHs'
                    "/images/Welcome_Image.png"
                  }
                />
              </Flex>
            </Stack>
          </Show>
          <Flex p={8} flex={1} justify={"center"} bg="background.main">
            <Stack spacing={4} w={"xl"} maxW={"full"} color="primary.gray">
              <Show below="lg">
                <Center>
                  <Image
                    alt={"nCight Logo"}
                    src={
                      "https://drive.google.com/uc?id=1KhpLDZ7pTBmUh2_h3TWkvA1mkrI4OXwL"
                    }
                    boxSize="100px"
                  />
                </Center>
              </Show>
              <Heading pb={6} textAlign={"center"}>
                Welcome to nCight!
              </Heading>
              {loginErrorObject.isError ? (
                <Alert variant="solid" status="error" justifyContent={"center"}>
                  <AlertIcon />
                  <AlertTitle>{loginErrorObject.errorMessage}</AlertTitle>
                </Alert>
              ) : null}
              <Tabs
                variant="unstyled"
                size="lg"
                onChange={(index: number) => {
                  showLoginError({ isError: false, errorMessage: "" });
                }}
              >
                <TabList>
                  <HStack borderTopRadius="6px" bg="background.tabs">
                    <Tab
                      _selected={{
                        bg: "secondary.yellow",
                        borderTopLeftRadius: "md",
                      }}
                    >
                      Login
                    </Tab>
                    <Tab
                      _selected={{
                        bg: "secondary.yellow",
                        borderTopRightRadius: "md",
                      }}
                    >
                      Sign Up
                    </Tab>
                  </HStack>
                </TabList>
                <TabPanels bg="background.tabs">
                  <TabPanel>
                    <LoginForm showLoginError={showLoginError!} />
                  </TabPanel>
                  <TabPanel>
                    <SignUpForm />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </Flex>
        </Stack>
      )}
    </>
  );
};

export default Home;
