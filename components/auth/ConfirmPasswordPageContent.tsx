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
    FormHelperText,
    HStack,
    Link
  } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Router from "next/router";
import { CheckIcon } from "@chakra-ui/icons";
import { AiOutlineClose } from "react-icons/ai";
import BaseModal from "../general/BaseModal";
import VerificationModalContent from "./VerificationModalContent";
  
  export default function ConfirmPasswordPageContent(props: any) {
    const {
      handleSubmit,
      register,
      watch,
      formState: { errors },
    } = useForm<any>({defaultValues:{password:""}});
    const watchPassword = watch("password");

    const [successModal, showSuccessModal] = useState<boolean>(false);
    const [loading, isLoading] = useState(false);
    const [confirmPasswordErrorObject, showConfirmPasswordError] = useState <any>({
        isError: false,
        errorMessage: undefined,
      });

    async function forgotPasswordSubmit(confirmation_code:string, new_password:string) {
        try{
            const email = decodeURIComponent(
                new URLSearchParams(window.location.search).get("email") || ""
            )
            const result = await Auth.forgotPasswordSubmit(email,confirmation_code,new_password);
            console.log(result);
            if(result){
                showSuccessModal(true)
            }
        } catch(error:any){
          if (
                error.message === "Invalid verification code provided, please try again." ||
                error.message === "Invalid code provided, please request a code again."
            ) {
            showConfirmPasswordError({
                isError: true,
                errorMessage: <React.Fragment>Invalid verification code. Click <Link href="/forgotPassword"><u>here</u></Link> to send a new verification code</React.Fragment>,
            });
          }
          if ( error.message === "Attempt limit exceeded, please try after some time.") {
            showConfirmPasswordError({
                isError: true,
                errorMessage: "Too many reset attempts. Your account is now locked for 15 mins. If you still need help, please contact info@ncight.com",
            });
          }
        }
    }
  
    const onSubmit = (data: any) => {
        console.log(data);
        forgotPasswordSubmit(data.confirmation_code,data.password);
    };
    console.log(watchPassword);
    return (
      <Flex
        align={"center"}
        justify={"center"}
        bg={"background.main"}
        overflow={"auto"}
      >
        <Stack
          maxW={"full"}
          bg={"background.main"}
          direction={{ base: "column" }}
          color={"primary.gray"}
        >
            {confirmPasswordErrorObject.isError ? (
            <Alert variant="solid" status="error" justifyContent={"center"} maxW={'600px'}>
              <AlertIcon />
              <AlertTitle flexWrap={'wrap'}>{confirmPasswordErrorObject.errorMessage}</AlertTitle>
              <AlertDescription></AlertDescription>
            </Alert>
          ) : null}
          <Image
            alt={"Verify Email Image"}
            src={
              "/images/Confirm_Password_Image.jpeg"
            }
            w={'600px'}
          />
  
          <Center>
            <Heading textAlign={"center"} fontSize={{ base: "2xl", md: "3xl" }}>
              Create New Password
            </Heading>
          </Center>
          <Center>
          <chakra.form onSubmit={handleSubmit(onSubmit)} w={"inherit"}>
          <FormControl
           id="confirmation-code"
           isInvalid={Boolean(errors.confirmation_code)}
          >
            <FormLabel>Confirmation Code</FormLabel>
            <Input
                type=""
                size="lg"
                {...register("confirmation_code", {
                    required: { value: true, message: "Confirmation code is required." },
                    onChange(event) {
                        showConfirmPasswordError({isError:false, errorMessage:""})
                    },
                  })}
            />
            <FormErrorMessage>Confirmation code is required.</FormErrorMessage>
          </FormControl>

          <FormControl
            id="signup-password"
            isInvalid={Boolean(errors.password)}
          >
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              size="lg"
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
            />
            <FormErrorMessage>Password is required.</FormErrorMessage>
            <FormHelperText fontWeight="700" color="secondary.yellow">
              <HStack>
                {watchPassword?.length < 8 ? (
                  <AiOutlineClose />
                ) : (
                  <CheckIcon color={"green"} />
                )}
                <Text>8 characters</Text>
              </HStack>
            </FormHelperText>
            <FormHelperText fontWeight="700" color="secondary.yellow">
              <HStack>
                {!RegExp("(.*[A-Z].*)").test(watchPassword) ? (
                  <AiOutlineClose />
                ) : (
                  <CheckIcon color={"green"} />
                )}
                <Text>at least 1 uppercase letter</Text>
              </HStack>
            </FormHelperText>
            <FormHelperText fontWeight="700" color="secondary.yellow">
              <HStack>
                {!RegExp("(.*[a-z].*)").test(watchPassword) ? (
                  <AiOutlineClose />
                ) : (
                  <CheckIcon color={"green"} />
                )}
                <Text>at least 1 lowercase letter</Text>
              </HStack>
            </FormHelperText>
            <FormHelperText fontWeight="700" color="secondary.yellow">
              <HStack>
                {!RegExp("([^A-Za-z0-9])").test(watchPassword) ? (
                  <AiOutlineClose />
                ) : (
                  <CheckIcon color={"green"} />
                )}
                <Text>at least 1 special character</Text>
              </HStack>
            </FormHelperText>
            <FormHelperText fontWeight="700" color="secondary.yellow">
              <HStack>
                {!RegExp(".*[0-9].*").test(watchPassword) ? (
                  <AiOutlineClose />
                ) : (
                  <CheckIcon color={"green"} />
                )}
                <Text>at least 1 number</Text>
              </HStack>
            </FormHelperText>
          </FormControl>

          <FormControl
            pt={5}
            id="confirm-password"
            isInvalid={Boolean(errors.confirm_password)}
          >
            <FormLabel>Re-enter New Password</FormLabel>
            <Input
              type="password"
              size="lg"
              {...register("confirm_password", {
                required: { value: true, message: "Password is required" },
                validate: (val: string) => {
                    if (watchPassword !== val) {
                      return "Your passwords do no match";
                    }
                  }
              })}
            />
            <FormErrorMessage>{errors.confirm_password && errors.confirm_password.message}</FormErrorMessage>
          </FormControl>
            
              <Stack spacing={6} pt={"10"}>
                <Button
                  w={["xs", "md", "lg"]}
                  type="submit"
                  variant={"custom"}
                  isLoading={loading}
                >
                  Confirm
                </Button>
                <Button
                    w={["xs", "md", "lg"]}
                    onClick={() => {
                        Router.push("/");
                      }}
                    variant={"secondary"}
                >
                    Cancel
                </Button>
                <BaseModal
                  ChildComponent={VerificationModalContent}
                  modal={successModal}
                  showModal={showSuccessModal}
                />
              </Stack>
          </chakra.form>
          </Center>
        </Stack>
      </Flex>
    );
  }
  