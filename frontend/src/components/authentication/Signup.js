import React, { useState } from "react";
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

/*
RESOURCES: 
    #https://chakra-ui.com/docs/components/input/usage (Password field)
    #https://chakra-ui.com/docs/components/button/usage (Hide and show button)

NOTES:
Like bootstrap, you can add addons to the left and right of the Input component. Chakra UI exports InputGroup, InputLeftAddon, and InputRightAddon to help with this use case.
*/

const Signup = () => {
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);

  //Uploading picture to the cloud for the app via cloudinary API (explanation at the end)
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pic === "image/jpeg" || "image/jpg") {
      //acceptable formats
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatHub"); //preset created in cloudinary platform
      data.append("cloud_name", "piyushramnani");
      fetch("https://api.cloudinary.com/v1_1/piyushramnani/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString()); //gives a response in the console log
          setLoading(false); //You can also access the url of response that will take you to the uploaded picture in couldinary
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Uh-oh! You missed something.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setLoading(false);
      toast({
        title: "Oops! Password do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    //Error handling when user is signing up.
    //Of course Nobody wants the app to crash on signup page (at least!)
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );

      toast({
        title: "Hooray! Registration successful.",
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
    }
  };

  return (
    //Look and feel of the signup page
    <VStack spacing={"5px"} color={"#4A5568"}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder={"Your full name"}
          onChange={(e) => setName(e.target.value)}
          borderWidth={"0.5px"}
          borderColor={"gray.400"}
        ></Input>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder={"Enter your email"}
          onChange={(e) => setEmail(e.target.value)}
          borderWidth={"0.5px"}
          borderColor={"gray.400"}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder={"Create a password"}
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

      <FormControl id="password" isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder={"Create a password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            borderWidth={"0.5px"}
            borderColor={"gray.400"}
          ></Input>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Your Picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          p={"1.5"}
          onChange={(e) => postDetails(e.target.files[0])}
          borderWidth={"0.3px"}
          borderColor={"gray.400"}
        ></Input>
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
        Sign-up
      </Button>
    </VStack>
  );
};

export default Signup;

/* ---UNDERSTANDING THE CODE---
{
    Input: pic (file type), pics (file data)

    File Type Validation:
        Check if pic is "image/jpeg" or "image/jpg"

    If Valid File Type:
        Create data object and append file and parameters
        Send POST request to Cloudinary
        Process Cloudinary API response:
            Update pic state with Cloudinary URL
            Handle loading state

    If Invalid File Type:
        Handle unsupported file type

}

{ localStorage.setItem(key, value)
  The setItem() method of the 'Storage' interface, when passed a key name and value, will add that key to the given Storage object of a SESSION, or update that key's value if it already exists.
}
*/
