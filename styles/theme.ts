import { extendTheme, type ThemeConfig, theme, StyleFunctionProps } from "@chakra-ui/react";
import { League_Spartan } from '@next/font/google'

const leagueSpartan = League_Spartan({
    subsets: ['latin'],
})

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }

export const customTheme = extendTheme({
    config,
    fonts:{
        body: leagueSpartan,
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
            })
          },
          defaultProps:{
            focusBorderColor: "#F09E28"
        },
        },
        Select: {
            defaultProps:{
                focusBorderColor: "#F09E28",
            }
        },
        Box: {
            defaultProps:{
                bg: "#F09E28",
            }
        },
        Checkbox: {
            color: '#F09E28'
        }
    },
    fontSizes:{
        sm: '0.875rem'
    },
    colors:{
        background: {
            main:'#2B2B2B',
            tabs: '#3B3B3B'
        },
        primary: {
            gray: '#D8DADA',
            gray_blue: '#455469',
            red: '#D80916',
            white: '#FFFFFF'
        },
        secondary: {
            red_orange: '#E3481D',
            orange: '#FD7B25',
            yellow: '#F09E28',
        },
        font: {
            black: '#000000',
            gray: '#455469',
            orange: '#F96421'
        }
    }
});