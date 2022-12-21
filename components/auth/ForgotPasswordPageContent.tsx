import {
  Button,
  FormControl,
  Flex,
  Stack,
  Image,
  Center,
  Heading,
  chakra,
  Text,
  FormLabel,
  Input,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Router from "next/router";

export default function VerificationPageContent(props: any) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [loading, isLoading] = useState(false);
  const [forgotPasswordErrorObject, showForgotPasswordError] = useState({
    isError: false,
    errorMessage: "",
  });

  async function forgotPassword(username: string) {
    isLoading(true);
    try {
      const result = await Auth.forgotPassword(username);
      if (result) {
        Router.push({
          pathname: "/confirmPassword",
          query: { email: username },
        });
      }
    } catch (error: any) {
      if (error.message === "Username/client id combination not found.") {
        showForgotPasswordError({
          isError: true,
          errorMessage:
            "There was a problem resetting your password. Please try again or contact info@ncight.com if the problem persists.",
        });
      }
      if (
        error.message === "Attempt limit exceeded, please try after some time."
      ) {
        showForgotPasswordError({
          isError: true,
          errorMessage:
            "Too many reset attempts. Your account is now locked for 15 mins. If you still need help, please contact info@ncight.com",
        });
      } else {
        showForgotPasswordError({
          isError: true,
          errorMessage:
            "There was a problem resetting your password. Please try again or contact info@ncight.com if the problem persists.",
        });
      }
    }
    isLoading(false);
  }

  const onSubmit = (data: any) => {
    forgotPassword(data.email);
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={"background.main"}
      overflow={"auto"}
      pb={6}
    >
      <Stack
        maxW={"full"}
        bg={"background.main"}
        direction={{ base: "column" }}
        color={"primary.gray"}
      >
        {forgotPasswordErrorObject.isError ? (
          <Alert variant="solid" status="error" justifyContent={"center"} maxW={'500px'}>
            <AlertIcon />
            <AlertTitle flexWrap={"wrap"}>
              {forgotPasswordErrorObject.errorMessage}
            </AlertTitle>
            <AlertDescription></AlertDescription>
          </Alert>
        ) : null}
        <Image
          alt={"Verify Email Image"}
          src={"/images/Forgot_Password_Image.jpeg"}
          w={"500px"}
        />

        <Center>
          <Heading textAlign={"center"} fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot Password?
          </Heading>
        </Center>

        <Text textAlign={"center"}>
          Please enter the email associated with your account and
        </Text>
        <Text textAlign={"center"}>
          we’ll send an email instruction to reset your password.
        </Text>

        <Center>
          <chakra.form onSubmit={handleSubmit(onSubmit)} w={"inherit"}>
            <FormControl id="email" isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                type="email"
                size="lg"
                w={["xs", "md", "lg"]}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email format is incorrect",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <Stack spacing={6} pt={"10"}>
              <Button
                w={["xs", "md", "lg"]}
                type="submit"
                variant={"custom"}
                isLoading={loading}
              >
                Send Verification Code
              </Button>
              <Button
                w={["xs", "md", "lg"]}
                onClick={() => {
                  Router.push("/");
                }}
                variant={"secondary"}
              >
                Back to Login
              </Button>
            </Stack>
          </chakra.form>
        </Center>
      </Stack>
    </Flex>
  );
}
