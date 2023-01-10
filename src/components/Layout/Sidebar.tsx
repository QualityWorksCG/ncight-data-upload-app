import { Box, Stack } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";
import {
  AiFillHome,
  AiOutlineCloudUpload,
  AiOutlineUpload,
} from "react-icons/ai";
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

        <Box
          pl={2}
          onClick={() => {
            Router.push("/uploads");
            props.onClose();
          }}
        >
          <NavItem
            icon={AiOutlineUpload}
            isActive={router.pathname.includes("uploads") ? true : false}
          >
            Uploads
          </NavItem>
        </Box>
      </Stack>
    );
  };
  return <div>{renderSidebar()}</div>;
}

export default Sidebar;
