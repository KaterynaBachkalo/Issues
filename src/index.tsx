import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
  <>
    <Provider store={store}>
      <BrowserRouter basename="/issue-board">
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </>
);
