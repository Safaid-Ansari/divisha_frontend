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

const Store = () => {
  const userItem = localStorage.getItem("userInfo");
  const parseUser = JSON.parse(userItem);
  const userId = parseUser._id;
  console.log(userId);
  const toast = useToast();
  const [address, setAddress] = useState();
  const [gst, setGst] = useState();
  const [logo, setLogo] = useState();
  const [loading, setLoading] = useState(false);
  const [storeTimings, setStoreTimings] = useState();

  const postDetails = (logo) => {
    setLoading(true);
    if (logo === undefined) {
      toast({
        title: "logo are missing",
        description: "We've not received any pics.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (logo.type === "image/jpeg" || logo.type === "image/png") {
      const data = new FormData();
      data.append("file", logo);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dzjdog8vz");
      fetch("https://api.cloudinary.com/v1_1/dzjdog8vz/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLogo(data.secure_url);
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
    if (!address || !gst || !storeTimings || !logo) {
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
        `${ENDPOINT}/api/dashboard/store`,
        {
          address,
          gst,
          storeTimings,
          logo,
          userId,
        },
        config
      );
      console.log(data);
      toast({
        title: "Store Created Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      setLoading(false);
      setStoreTimings("");
      setGst("");
      setLogo("");
      setAddress("");
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          value={address}
          placeholder="Enter your Address "
          onChange={(e) => setAddress(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="gst" isRequired>
        <FormLabel>GST</FormLabel>
        <Input
          value={gst}
          placeholder="Enter your GST Number "
          onChange={(e) => setGst(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="storeTimings" isRequired>
        <FormLabel>Store Timing</FormLabel>
        <Input
          value={storeTimings}
          placeholder="Enter your Store Timings "
          onChange={(e) => setStoreTimings(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="logo" isRequired>
        <FormLabel>Upload Your Logo </FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          placeholder="upload logo "
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
        Add Store
      </Button>
    </VStack>
  );
};

export default Store;
