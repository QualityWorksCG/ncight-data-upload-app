import {
  Stack,
  Image,
  Center,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FailedVerificationModalContent(props: any) {
  const Router = useRouter();
  const [loading, isLoading] = useState(false);
  const toast = useToast();
  async function resendConfirmationCode(username: string) {
    isLoading(true);
    try {
      await Auth.resendSignUp(username);
      toast({
        title: "Email resent!",
        description: "Please check your inbox for a new verification code",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      props.onClose(false);
    } catch (err) {
      console.log("error resending code: ", err);
      toast({
        title: "Error",
        description: "We had a problem resending code. Please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    isLoading(false);
  }

  return (
    <Stack color={"primary.gray"} spacing={2}>
      <Center>
        <Image
          alt={"nCight Logo"}
          src={
            "https://drive.google.com/uc?id=18z2Eiyh6kFmgHXsaCqWGQK85VDatuFut"
          }
          boxSize={"50%"}
        />
      </Center>
      <Center>
        <Heading textAlign={"center"} fontSize={{ base: "2xl", md: "3xl" }}>
          Unable to Verify your account!
        </Heading>
      </Center>

      <Center textAlign={"center"}>
        Your account could not be verified. You can request a new verification
        code below.
      </Center>
      <Stack spacing={2} pt={"2"}>
        <Button
          isLoading={loading}
          borderRadius="3xl"
          bg="secondary.yellow"
          color="primary.white"
          onClick={() =>
            resendConfirmationCode(
              new URLSearchParams(window.location.search).get("email") || ""
            )
          }
        >
          Resend Verification
        </Button>
      </Stack>
    </Stack>
  );
}
