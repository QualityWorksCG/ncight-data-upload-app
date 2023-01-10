import { Stack, Center, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaRegThumbsUp } from "react-icons/fa";

export default function PasswordConfirmationModalContent(props: any) {
  const Router = useRouter();
  return (
    <Flex flex={1} justify={"center"}>
      <Stack color={"primary.gray"} spacing={"10"}>
        <Center>
          <FaRegThumbsUp fontSize={150} color={"#F09E28"} />
        </Center>

        <Center textAlign={"center"}>Your password was successfully changed</Center>
        <Button
          onClick={() => {
            Router.push("/");
          }}
          variant={"custom"}
        >
          Go back to Home
        </Button>
      </Stack>
    </Flex>
  );
}
