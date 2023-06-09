import React from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();


  const userItem = localStorage.getItem("userInfo");
  const LogoutHandler = () => {
    const userInfo = localStorage.removeItem("userInfo");
    if (!userInfo) {
      navigate("/");
    }
  };
  return (
    <VStack>
      <Box
        w={"100%"}
        h={"55px"}
        bg={"cyan"}
        display={"flex"}
        justifyContent={"end"}
      >
        {userItem ? (
          <>
            <Box
              display={"flex"}
              fontSize={"20px"}
              gap={"24px"}
              mt={"13px"}
              cursor={"pointer"}
            >
              <Link to={"inventory"}>
                {" "}
                <Text>Inventory</Text>
              </Link>
              <Link to={"store"}>
                {" "}
                <Text>Store</Text>
              </Link>

              <Link to={"category"}>
                {" "}
                <Text>Category</Text>
              </Link>

              <Link to={"productSearch"}>
                {" "}
                <Text>Search Product</Text>
              </Link>
            </Box>
            <Button
              onClick={LogoutHandler}
              fontSize={"24px"}
              ml={"30px"}
              mr={"20px"}
              mb={"5px"}
              cursor={"pointer"}
            >
              {" "}
              Logout
            </Button>
          </>
        ) : (
          <Box display={"flex"} mr={"20px"} fontSize={"24px"} mt={"7px"}>
            {" "}
            Divisha Technology{" "}
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default Header;
