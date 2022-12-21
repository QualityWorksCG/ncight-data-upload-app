import { Box, Stack } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import NavItem from "./NavItem";

function Sidebar(props: any) {
  const router = useRouter();
  const renderSidebar = () => {
    return (
      <Stack spacing={2}>
        <Box
          onClick={() => {
            Router.push("/home");
            props.onClose();
          }}
        >
          <NavItem
            icon={AiFillHome}
            isActive={router.pathname.includes("home") ? true : false}
          >
            Home
          </NavItem>
        </Box>

        <Box
          onClick={() => {
            Router.push("/profile");
            props.onClose();
          }}
        >
          <NavItem
            icon={FaUserAlt}
            isActive={router.pathname.includes("profile") ? true : false}
          >
            Profile
          </NavItem>
        </Box>
      </Stack>
    );
  };
  return <div>{renderSidebar()}</div>;
}

export default Sidebar;
