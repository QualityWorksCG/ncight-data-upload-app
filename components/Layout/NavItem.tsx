import { Flex, HStack, Icon, Text } from "@chakra-ui/react";

const NavItem = (props: any) => {
  const { icon, children, isActive, ...rest } = props;

  return (
    <HStack
      align="center"
      py="3"
      justifyContent={"center"}
      marginLeft={-16}
      cursor="pointer"
      color={isActive ? "white" : "white"}
      bg={isActive ? "secondary.yellow" : ""}
      _hover={{
        bg: `${isActive ? "" : "secondary.yellow"}`,
        borderColor: "cyan",
        color: `${isActive ? "" : "white"}`,
      }}
      role="group"
      fontWeight="medium"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mx="4"
          boxSize="6"
          _groupHover={{
            color: props.color,
          }}
          as={icon}
        />
      )}
      <Text fontSize={"md"}> {children}</Text>
    </HStack>
  );
};

export default NavItem;
