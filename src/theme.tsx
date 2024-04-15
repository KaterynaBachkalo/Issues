import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0em",
  sm: "24em",
  md: "48em",
  lg: "58em",
  xl: "80em",
  "2xl": "96em",
};

const theme = extendTheme({
  global: {
    breakpoints,
    fonts: {
      body: "Open Sans, sans-serif",
    },
    styles: {
      a: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
