import { Box, Stack } from "@chakra-ui/react";
import { BiClinic } from "react-icons/bi";
import NavItem from "./NavItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiSettings, FiUsers } from "react-icons/fi";
import { FaChild, FaUserAlt, FaUsers } from "react-icons/fa";
import {
  AiFillHome,
  AiOutlineCloudUpload,
  AiOutlineHome,
} from "react-icons/ai";

function Sidebar(props: any) {
  const router = useRouter();

  const renderSidebar = () => {
    return (
      <Stack spacing={2}>
        <Link passHref href={"/home"}>
          <Box>
            <NavItem
              icon={AiFillHome}
              isActive={router.pathname.includes("home") ? true : false}
            >
              Home
            </NavItem>
          </Box>
        </Link>

        <Link passHref href={"/upload"}>
          <Box>
            <NavItem
              icon={AiOutlineCloudUpload}
              isActive={router.pathname.includes("upload") ? true : false}
            >
              Upload Images
            </NavItem>
          </Box>
        </Link>
        <Link passHref href={"/profile"}>
          <Box>
            <NavItem
              icon={FaUserAlt}
              isActive={router.pathname.includes("profile") ? true : false}
            >
              Profile
            </NavItem>
          </Box>
        </Link>
      </Stack>
    );
  };
  return <div>{renderSidebar()}</div>;
}

export default Sidebar;
