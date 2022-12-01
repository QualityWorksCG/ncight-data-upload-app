import { extendTheme, type ThemeConfig, theme, StyleFunctionProps} from "@chakra-ui/react";



export const customTheme = extendTheme({

    fonts:{
        body: `'Roboto Condensed', sans-serif`,
        heading: `'Roboto Condensed', sans-serif`
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
        Button: {
            defaultProps:{
                _hover:{
                    bg: "transparent",
                    color: "#F09E28",
                }
            }
        },
        Heading: {
            defaultProps:{
                fontWeight: '700'
            }
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