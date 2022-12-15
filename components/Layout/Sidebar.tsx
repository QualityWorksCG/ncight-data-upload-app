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
        <Link
          passHref
          href={"/home"}
          onClick={() => {
            props?.onClose();
          }}
        >
          <Box>
            <NavItem
              onClose={props.onClose()}
              icon={AiFillHome}
              isActive={router.pathname.includes("home") ? true : false}
            >
              Home
            </NavItem>
          </Box>
        </Link>
        <Link
          onClick={() => {
            props?.onClose();
          }}
          passHref
          href={"/profile"}
        >
          <Box>
            <NavItem
              onClose={props.onClose()}
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
