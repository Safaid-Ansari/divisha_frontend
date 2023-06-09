import axios from "axios";
import React, { useState } from "react";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import "./Header.css";
const Card = () => {
  const [query, setQuery] = useState("");
  console.log("Query", query);

  const [results, setResults] = useState([]);
  console.log("results", results);
  const userItem = localStorage.getItem("userInfo");
  const parseUser = JSON.parse(userItem);
  const ENDPOINT = "https://divisha-seller.onrender.com";
  const handleSearch = async () => {
    try {
      const config = {
        "content-type": "application/json",
        headers: {
          Authorization: `Bearer ${parseUser.token}`,
        },
      };
      const response = await axios.get(
        `${ENDPOINT}/api/dashboard/inventory/search?query=${query}`,
        config
      );
      setResults(response.data.inventory);
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  return (
    <VStack>
      <Box
        w={"100%"}
        bg={"cyan"}
        h={"10px"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        {userItem ? (
          <>
            <Box mt={"30px"} display={"flex"} justifyContent={"center"}>
              <Input
                ml={"400px"}
                h={"40px"}
                fontSize={"20px"}
                textAlign={"center"}
                borderRadius={"5px"}
                value={query}
                placeholder="Search Products..."
                onChange={(e) => setQuery(e.target.value)}
              ></Input>
              <Button
                fontSize={"20px"}
                ml={"10px"}
                mb={"7px"}
                w={"160px"}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </>
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            ml={"20px"}
            fontSize={"24px"}
            justifyContent={"center"}
          >
            {" "}
            Divisha Technology{" "}
          </Box>
        )}
      </Box>

      <Box
        spacing={"5px"}
        display={"flex"}
        flexDir={"column"}
        position={"absolute"}
        left={"10px"}
        top={"150px"}
      >
        <div className="card-container">
          {results
            ? results.map((product) => (
                <div key={product._id} className="card">
                  <img src={product.images[0]} alt={product.productName} />
                  <h3>ProductName: {product.productName}</h3>
                  <p>MRP: {product.mrp}</p>
                  <p>SP: {product.sp}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              ))
            : ""}
        </div>
      </Box>
    </VStack>
  );
};

export default Card;
