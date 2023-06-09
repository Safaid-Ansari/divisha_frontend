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

const Inventory = () => {
const userItem = localStorage.getItem("userInfo");
const parseUser = JSON.parse(userItem);
  const userId = parseUser._id;
  const categoryId = localStorage.getItem("CategoryId");
  console.log(userId);
  const toast = useToast();
  const [productName, setProductName] = useState();
  const [mrp, setMrp] = useState();
  const [sp, setSp] = useState();
  const [quantity, setQuantity] = useState();
  const [images, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const postDetails = (images) => {
    setLoading(true);
    if (images === undefined) {
      toast({
        title: "logo are missing",
        description: "We've not received any pics.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (images.type === "image/jpeg" || images.type === "image/png") {
      const data = new FormData();
      data.append("file", images);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dzjdog8vz");
      fetch("https://api.cloudinary.com/v1_1/dzjdog8vz/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setImage(data.secure_url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an logo!!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    if (!productName || !mrp || !sp || !images || !quantity) {
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

    try {
      const config = {
        "content-type": "application/json",
        headers: {
          Authorization: `Bearer ${parseUser.token}`,
        },
      };
      const { data } = await axios.post(
        `${ENDPOINT}/api/dashboard/inventory`,
        {
          productName,
          mrp,
          sp,
          images,
          userId,
          quantity,
          categoryId,
        },
        config
      );
      console.log(data);
      toast({
        title: "Inventory Created Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      setLoading(false);
      setMrp("");
      setSp("");
      setImage("");
      setQuantity("");
      setProductName("");
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
      <FormControl id="name" isRequired>
        <FormLabel>Product Name </FormLabel>
        <Input
          value={productName}
          placeholder="Enter Product Name "
          onChange={(e) => setProductName(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="mrp" isRequired>
        <FormLabel>MRP</FormLabel>
        <Input
          value={mrp}
          placeholder="Enter MRP"
          onChange={(e) => setMrp(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="storeTimings" isRequired>
        <FormLabel>SP</FormLabel>
        <Input
          value={sp}
          placeholder="Enter your Store Timings "
          onChange={(e) => setSp(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="storeTimings" isRequired>
        <FormLabel>Quantity</FormLabel>
        <Input
          value={quantity}
          placeholder="Enter your Store Timings "
          onChange={(e) => setQuantity(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="image" isRequired>
        <FormLabel>Upload Your Image </FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          placeholder="upload image "
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Add Inventory
      </Button>
    </VStack>
  );
};

export default Inventory;
