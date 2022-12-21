import { Stack, Image, Center, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaRegThumbsUp } from "react-icons/fa";

export default function VerificationModalContent(props: any) {
  const Router = useRouter();
  return (
    <Flex flex={1} justify={"center"}>
      <Stack color={"primary.gray"} spacing={"10"}>
        <Center>
          <FaRegThumbsUp fontSize={150} color={"#F09E28"} />
        </Center>

        <Center textAlign={"center"}>You've been Successfully Verified!</Center>
        <Button
          onClick={() => {
            Router.push("/");
          }}
          variant={"custom"}
        >
          Go back to Login
        </Button>
      </Stack>
    </Flex>
  );
}
