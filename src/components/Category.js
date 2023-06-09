import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
const ENDPOINT = "https://divisha-seller.onrender.com";

const Category = () => {
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const userItem = localStorage.getItem("userInfo");
  const parseUser = JSON.parse(userItem);

  const submitHandler = async () => {
    if (!category || !subCategory) {
      toast({
        title: "Please Fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        "content-type": "application/json",
        headers: {
          Authorization: `Bearer ${parseUser.token}`,
        },
      };
      const { data } = await axios.post(
        `${ENDPOINT}/api/dashboard/category`,
        {
          category,
          subCategory,
        },
        config
      );
      console.log(data);
      localStorage.setItem("CategoryId", data.category._id);
      toast({
        title: "Created Category successful ",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      //   navigate("/inventory");
      setCategory("");
      setSubCategory("");
    } catch (error) {
      toast({
        title: "Something went wrong ",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    }
  };
  return (
    <VStack
      spacing={"5px"}
      w={"50%"}
      position={"absolute"}
      top={"100px"}
      left={"330px"}
    >
      <FormControl id="category" isRequired>
        <FormLabel>Category</FormLabel>
        <Input
          value={category}
          placeholder="Enter your category"
          onChange={(e) => setCategory(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="sub-category" isRequired>
        <FormLabel>Sub_Category</FormLabel>

        <Input
          value={subCategory}
          type={"text"}
          placeholder="Enter sub_Category "
          onChange={(e) => setSubCategory(e.target.value)}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Add Category
      </Button>
    </VStack>
  );
};

export default Category;
