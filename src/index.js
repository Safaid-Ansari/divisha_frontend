import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 1. Import the extendTheme function
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import SellerProvider from "./context/SellerProvider";
import Header from "./components/Header";
const root = ReactDOM.createRoot(document.getElementById("root"));
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });
root.render(
  <BrowserRouter>
    <Header></Header>
    <SellerProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </SellerProvider>
  </BrowserRouter>
);
