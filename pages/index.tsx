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
  Hide,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  Link,
  Container
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { withSSRContext } from "aws-amplify";
import { redirect } from "next/navigation";
import useUser from "../lib/useUser";
import Router from "next/router";

const Home: NextPage = () => {
  const [loginErrorObject, showLoginError] = useState({
    isError: false,
    errorMessage: "",
  });

  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      bg="background.main"
    >
      <Show above="lg">
        <Flex flexDirection={'column'}>
            <Container minW={'100%'}  bg='secondary.yellow' centerContent={true}>
              <Flex>          
              <Link
                pt={'2.5'}
                pb={'2.5'} 
                color="white"
                href="https://www.ncight.com"
                target="_blank"
                rel="noopener noreferrer">              <InfoOutlineIcon             
                color="white" marginRight={'2.5'}/>  Learn More About nCight</Link> 
              </Flex> 
            </Container>
            {/* <Alert status='warning' colorScheme={"secondary.yellow"} justifyContent={'center'}>
            <AlertIcon />
            <Link 
              color="white"
              href="https://www.ncight.com"
              target="_blank"
              rel="noopener noreferrer">Learn More About nCight</Link>
          </Alert> */}
            <Image
              alt={"Sign up Image"}
              objectFit={"cover"}
              src={
                //'https://drive.google.com/uc?id=10o5dt6LjNRdlLkjepmKK9ALU4Y1epgHs'
                "/images/Welcome_Image.png"
              }
              margin={'0px'}
            />
        </Flex>
      </Show>
      <Flex p={8} flex={1} justify={"center"} bg="background.main">
        <Stack spacing={4} w={"xl"} maxW={"full"} color="primary.gray">
          <Hide above="lg">
            <Show below="lg">
            <Container minW={'100%'}  bg='secondary.yellow' centerContent={true}>
              <Flex>          
              <Link
                pt={'2.5'}
                pb={'2.5'} 
                color="white"
                href="https://www.ncight.com"
                target="_blank"
                rel="noopener noreferrer">              <InfoOutlineIcon             
                color="white" marginRight={'2.5'}/>  Learn More About nCight</Link> 
              </Flex> 
            </Container>
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
          </Hide>
          <Heading textAlign={"center"}>Welcome to nCight!</Heading>
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
  );
};

export default Home;
