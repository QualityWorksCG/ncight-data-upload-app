import { Box, Center, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

type Props = {};

function TermsAndConditions({}: Props) {
  return (
    <Box>
      <Box h={"20%"} bg={"#D9D9D9"}>
        <Center>
          <Image w={"120px"} py={2} src="/images/logo.png" />
        </Center>
      </Box>
      <Box h={"80%"} bg={"#2B2B2B"} p={[2, 20]}>
        <Heading color={"#D8DADA"} size={"lg"} py={4}>
          Terms and Conditions
        </Heading>

        <embed width={"100%"} height={"1000px"} src="/terms.html"></embed>
      </Box>
    </Box>
  );
}

export default TermsAndConditions;
