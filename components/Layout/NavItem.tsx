import { Flex, Icon } from "@chakra-ui/react";

const NavItem = (props: any) => {
  const { icon, children, isActive, ...rest } = props;

  return (
    <Flex
      align="center"
      pl="4"
      py="3"
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
          mx="2"
          boxSize="4"
          _groupHover={{
            color: props.color,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

export default NavItem;
