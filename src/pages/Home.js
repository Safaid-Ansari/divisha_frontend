import React, { useEffect } from "react";
import "../App.css";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/SignUp";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/inventory");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent={"center"}
        p={3}
        bg={"white"}
        m={"40px 0 15px 0"}
        w={"100%"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text
          fontSize={"4xl"}
          fontFamily={"Work sans"}
          color={"black"}
          textAlign={"center"}
        >
          {" "}
          Divisha Technology
        </Text>
      </Box>
      <Box
        bg={"white"}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login></Login>
            </TabPanel>
            <TabPanel>
              <Signup></Signup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
