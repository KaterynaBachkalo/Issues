import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  global: {
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
