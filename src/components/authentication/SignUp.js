import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ENDPOINT = "https://divisha-seller.onrender.com";

const SignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  const submitHandler = async () => {
    if (!businessName || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "password does not match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        "content-type": "application/json",
      };
      const { data } = await axios.post(
        `${ENDPOINT}/api/auth/signup`,
        {
          businessName,
          email,
          password,
          confirmPassword,
        },
        config
      );
      toast({
        title: "Register successful Please Login",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setBusinessName("");
    } catch (error) {
      toast({
        title: "Something went wrong ",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>E-Mail</FormLabel>
        <Input
          value={email}
          placeholder="Enter your email "
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter password "
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Show" : "Hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm-Password</FormLabel>
        <InputGroup>
          <Input
            value={confirmPassword}
            type={show ? "text" : "password"}
            placeholder="Enter confirm password  "
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Show" : "Hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="first-name" isRequired>
        <FormLabel>Business Name</FormLabel>
        <Input
          value={businessName}
          placeholder="Enter your Business name "
          onChange={(e) => setBusinessName(e.target.value)}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;
