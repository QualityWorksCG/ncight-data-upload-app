import {
  extendTheme,
  type ThemeConfig,
  theme,
  StyleFunctionProps,
} from "@chakra-ui/react";

export const customTheme = extendTheme({
  fonts: {
    body: `'Roboto Condensed', sans-serif`,
    heading: `'Roboto Condensed', sans-serif`,
  },
  components: {
    Input: {
      variants: {
        outline: (props: StyleFunctionProps) => ({
          ...theme.components.Input.variants!.outline(props),
          field: {
            ...theme.components.Input.variants!.outline(props).field,
            borderRadius: "6px",
            color: "#D8DADA",
          },
        }),
      },
      defaultProps: {
        focusBorderColor: "#F09E28",
      },
    },
    Button: {
      variants: {
        custom: (props: StyleFunctionProps) => ({
          // ...theme.components.Button.variants!.outline(props),
          bg: "#F09E28",
          borderRadius: "20px",
          color: "white",
          _hover: {
            bg: "orange",
            color: "white",
          },
          _active: {
            bg: "#d88e24",
            color: "white",
          },
        }),
        custom_outline: (props: StyleFunctionProps) => ({
          // ...theme.components.Button.variants!.outline(props),
          // bg: "#F09E28",
          borderRadius: "20px",
          borderWidth: "2px",
          borderColor: "#F09E28",
          color: "#F09E28",
          _hover: {
            bg: "orange",
            color: "white",
          },
          _active: {
            bg: "#d88e24",
            color: "white",
          },
        }),
      },
    },
    Heading: {
      defaultProps: {
        fontWeight: "700",
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: "#F09E28",
      },
    },
    Box: {
      defaultProps: {
        bg: "#F09E28",
      },
    },
    Checkbox: {
      color: "#F09E28",
    },
  },
  colors: {
    background: {
      main: "#2B2B2B",
      tabs: "#3B3B3B",
    },
    primary: {
      gray: "#D8DADA",
      gray_blue: "#455469",
      red: "#D80916",
      white: "#FFFFFF",
    },
    secondary: {
      red_orange: "#E3481D",
      orange: "#FD7B25",
      yellow: "#F09E28",
      yellow_light: "#f09e28",
    },
    font: {
      black: "#000000",
      gray: "#455469",
      orange: "#F96421",
    },
  },
});
