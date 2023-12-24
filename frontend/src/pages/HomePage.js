import React from "react";
import { useEffect } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats"); //if logged in, move to chat page
  }, [history]);

  return (
    <Container maxW={"l"} centerContent>
      <Box
        justifyContent="center"
        bg={"gray.200"}
        w="40%"
        p="3"
        m="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth={"3px"}
        borderColor={"gray.400"}
      >
        <Text
          align={"center"}
          fontFamily={"poppins"}
          fontSize={"3xl"}
          fontWeight={"600"}
          color={"#4A5568"}
        >
          ChatHub
        </Text>
      </Box>
      <Box
        bg={"gray.200"}
        w="40%"
        maxH="80vh"
        p="3"
        m="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth={"3px"}
        borderColor={"gray.400"}
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign-up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
