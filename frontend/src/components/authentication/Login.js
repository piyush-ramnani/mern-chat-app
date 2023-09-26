import React from "react";
import { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  InputRightElement,
} from "@chakra-ui/react";
import { Input, InputGroup } from "@chakra-ui/react";
import { Button, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  //react's inbuilt states
  const toast = useToast();
  const history = useHistory();
  const handleClick = () => setShow(!show);

  //states for hooks
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Uh-oh! You missed something.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    //Error handling when user logging in - same as signup
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Enjoy the app experience.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      //storing the information locally.
      localStorage.setItem("userInfo", JSON.stringify(data));
      //redirecting user to chat page
      history.push("/chats");
      setLoading(false);
    } catch (error) {
      toast({
        title: "An error occured :(",
        description: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"} color={"#4A5568"}>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder={"Enter your email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          borderWidth={"0.5px"}
          borderColor={"gray.400"}
        ></Input>
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder={"Create a password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderWidth={"0.5px"}
            borderColor={"gray.400"}
          ></Input>
          <InputRightElement w="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              color={"#4A5568"}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        width={"100%"}
        mt={1.5}
        colorScheme="gray"
        fontWeight={"600"}
        color={"#4A5568"}
        borderWidth={"2px"}
        borderColor={"#276749"}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        width={"100%"}
        mt={1.5}
        colorScheme="teal"
        fontWeight={"600"}
        color={"gray.200"}
        borderWidth={"2px"}
        borderColor={"#276749"}
        onClick={() => {
          setEmail("demo@login.com");
          setPassword("123456");
        }}
      >
        Get demo credentials
      </Button>
    </VStack>
  );
};

export default Login;
