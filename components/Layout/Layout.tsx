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
  Show,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import Sidebar from "./Sidebar";
import { FiLogOut } from "react-icons/fi";
import useUser from "../../lib/useUser";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const Layout = ({ children }: any) => {
  const sidebar = useDisclosure();
  const { user, loading, loggedOut, signOut } = useUser();

  if (loading || !user) {
    return (
      <Center h={"100vh"}>
        <Spinner color="yellow" />
      </Center>
    );
  }
  const closeMenu = () => {
    sidebar.onClose();
  };
  const SidebarContent = (props: any) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
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
      <Show below="md">
        <HStack
          p={6}
          onClick={() => {
            closeMenu();
          }}
        >
          <AiOutlineClose color="orange" fontSize={30} />
          <Text pl={8} fontSize={25} color={"white"}>
            Close
          </Text>
        </HStack>
      </Show>
      <Center my={10}>
        <Box height={"20px"} width={"100px"}></Box>
      </Center>

      <Flex
        h={["76%", "90%"]}
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
        justifyContent={"space-between"}
      >
        <Box>
          <Sidebar onClose={closeMenu} />
        </Box>
        <HStack
          pl={6}
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
      <Box position={"relative"}>
        <Box
          position={"fixed"}
          top={0}
          left={0}
          w={"full"}
          zIndex={1}
          ml={{ base: 0, md: 0 }}
          transition=".3s ease"
        >
          <HStack
            as="header"
            align="center"
            justifyContent={"space-between"}
            w="full"
            px="4"
            bg="#343334"
            shadow={"base"}
            h="16"
          >
            <Show above="md">
              <Box pt={4}>
                <Image w={"90px"} pb={2} src="/images/logo.png" />
              </Box>
            </Show>

            <IconButton
              display={{ base: "inline-flex", md: "none" }}
              aria-label={""}
              onClick={sidebar.onOpen}
              variant={"unstyled"}
              color={"secondary.yellow"}
              icon={<HiOutlineMenuAlt1 fontSize={30} />}
            />
            <Box pl={4} pt={4}>
              <Image
                display={{ base: "inline-flex", md: "none" }}
                w={"90px"}
                pb={2}
                src="/images/logo.png"
              />
            </Box>

            <Button
              marginLeft={"auto"}
              borderRadius={"full"}
              variant={"custom"}
              size={"sm"}
            >
              Check my wallet
            </Button>
          </HStack>
        </Box>
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
          size={"xxs"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
      </Box>
      <Box ml={{ base: 0, md: 60 }} pt={20} bg={"#2B2B2B"} as="main" p="4">
        <Spacer pt={20} />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
