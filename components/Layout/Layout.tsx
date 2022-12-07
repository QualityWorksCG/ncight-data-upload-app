import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import Sidebar from "./Sidebar";
import { FiLogOut } from "react-icons/fi";

const Layout = ({ children }: any) => {
  const sidebar = useDisclosure();

  const SidebarContent = (props: any) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="#343434"
      borderColor="inherit"
      shadow={"md"}
      w="60"
      {...props}
    >
      <Center my={10}>
        <Image
          alt="stay safe logo"
          objectFit="cover"
          height={"100px"}
          width={"100px"}
          src="/images/logo.png"
        />
      </Center>

      <Flex
        h={"77%"}
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
        justifyContent={"space-between"}
      >
        <Box>
          <Sidebar />
        </Box>
        <HStack pl={6}>
          <FiLogOut color="#F09E28" fontSize={"25"} />
          <Text color={"white"} fontSize={"lg"}>
            Logout
          </Text>
        </HStack>
      </Flex>
    </Box>
  );

  return (
    <Box shadow={"lg"} as="section" bg={"#2B2B2B"} minH="100vh">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <HStack
          as="header"
          align="center"
          justify="end"
          w="full"
          px="4"
          bg="#343334"
          h="14"
        >
          <Button
            borderRadius={"full"}
            bg={"secondary.yellow"}
            color={"white"}
            _hover={{ bg: "secondary.yellow_light" }}
          >
            Check my wallet
          </Button>
        </HStack>
        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
