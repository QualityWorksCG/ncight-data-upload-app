import {
  Button,
  FormControl,
  Flex,
  Stack,
  HStack,
  Image,
  PinInput,
  PinInputField,
  Show,
  Hide,
  Center,
  Heading,
  chakra,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import VerificationModalContent from "./VerificationModalContent";
import FailedVerificationModalContent from "./FailedVerificationModalContent";
import BaseModal from "../general/BaseModal";
import { useRouter } from "next/router";

export default function VerificationPageContent(props: any) {
  const {
    handleSubmit,
    control,
    unregister,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { email } = router.query;
  const [successModal, showSuccessModal] = useState<boolean>(false);
  const [errorModal, showErrorModal] = useState<boolean>(false);
  const [loading, isLoading] = useState(false);
  async function confirmSignUp(username: string, confirmationCode: string) {
    isLoading(true);
    try {
      const confirmUser = await Auth.confirmSignUp(username, confirmationCode);
      if (confirmUser) {
        showSuccessModal(true);
      }
      unregister("confirmation_code");
    } catch (error) {
      showErrorModal(true);

      unregister("confirmation_code");
    }
    isLoading(false);
  }

  const onSubmit = (data: any) => {
    confirmSignUp(
      decodeURIComponent(
        new URLSearchParams(window.location.search).get("email") || ""
      ),
      data.confirmation_code
    );
  };

  return (
    <Center>
    <Flex
      align={"center"}
      justifyContent={"center"}
      bg={"background.main"}
      overflow={"auto"}
    >
        <Stack
          bg={"background.main"}
          direction={{ base: "column" }}
          color={"primary.gray"}
        >
            <Image
              alt={"Verify Email Image"}
              src={
                "/images/Email_Verification_Code_Image.png"
              }
              w={['md','2xl']}
              margin={'auto'}
            />

          <Heading textAlign={"center"} fontSize={{ base: "2xl", md: "3xl" }}>
            Enter Verification Code
          </Heading>


          <Text textAlign={"center"}>
            We've sent a verification code to your email, {email}.
          </Text>
          <Text textAlign={"center"}> Please check your email for the code.</Text>

          <chakra.form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="confirmation_code"
              rules={{
                required: {
                  value: true,
                  message: "Please enter your verification code",
                },
              }}
              render={({ field: { ref, ...rest } }) => (
                <FormControl isInvalid={errors.confirmation_code != null}>
                  <Center>
                    <HStack>
                      <PinInput otp {...rest} size={"lg"}>
                        <PinInputField
                          borderColor={
                            errors.confirmation_code != null ? "red" : ""
                          }
                        />
                        <PinInputField
                          borderColor={
                            errors.confirmation_code != null ? "red" : ""
                          }
                        />
                        <PinInputField
                          borderColor={
                            errors.confirmation_code != null ? "red" : ""
                          }
                        />
                        <PinInputField
                          borderColor={
                            errors.confirmation_code != null ? "red" : ""
                          }
                        />
                        <PinInputField
                          borderColor={
                            errors.confirmation_code != null ? "red" : ""
                          }
                        />
                        <PinInputField
                          borderColor={
                            errors.confirmation_code != null ? "red" : ""
                          }
                        />
                      </PinInput>
                    </HStack>
                  </Center>
                  <Center>
                    <FormErrorMessage>
                      {errors.confirmation_code?.message}
                    </FormErrorMessage>
                  </Center>
                </FormControl>
              )}
            />

            <Center>
              <Stack spacing={6} pt={"10"}>
                <Button
                  w={["xs", "md", "lg"]}
                  type="submit"
                  variant={"custom"}
                  isLoading={loading}
                >
                  Verify
                </Button>
                <BaseModal
                  ChildComponent={FailedVerificationModalContent}
                  modal={errorModal}
                  showModal={showErrorModal}
                />
                <BaseModal
                  ChildComponent={VerificationModalContent}
                  modal={successModal}
                  showModal={showSuccessModal}
                />
              </Stack>
            </Center>
          </chakra.form>
        </Stack>
    </Flex>
    </Center>
  );
}
