import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import Sidebar from "./Sidebar";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import useUser from "../../lib/useUser";
import Router from "next/router";

const Layout = ({ children }: any) => {
  const sidebar = useDisclosure();
  const { user, loading, loggedOut, signOut } = useUser({ redirect: "/" });
  if (loading || !user) {
    return (
      <Center h={"100vh"}>
        <Spinner color="yellow" />
      </Center>
    );
  }
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
        <HStack
          position={"absolute"}
          bottom={0}
          p={6}
          _hover={{ cursor: "pointer" }}
          onClick={async () => {
            await signOut();
          }}
        >
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
          justifyContent={"space-between"}
          w="full"
          px="4"
          bg="#343334"
          h="14"
        >
          <IconButton
            display={{ base: "inline-flex", md: "none" }}
            aria-label={""}
            onClick={sidebar.onOpen}
            variant={"unstyled"}
            color={"secondary.yellow"}
            icon={<HiOutlineMenuAlt1 fontSize={30} />}
          />
          <Box pt={4}>
            <Image
              display={{ base: "inline-flex", md: "none" }}
              w={"40px"}
              pb={2}
              src="/images/logo-only.png"
            />
          </Box>

          <Button marginLeft={"auto"} borderRadius={"full"} variant={"custom"}>
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
