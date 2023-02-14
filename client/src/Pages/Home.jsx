import React, { useEffect } from 'react'
import Login from "../components/Auth/Login"
import Signup from "../components/Auth/Signup"
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const history = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) {
            history("/chats");
        }
    }, [history])


    return (
        <Container maxW="xl" centerContent>
            <Box
                p={3}
                bg={"white"}
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text align={"center"} fontSize="4xl">Baatein</Text>
            </Box>
            <Box
                bg="white"
                w="100%"
                p={4}
                borderRadius="lg"
                borderWidth="1px"
                color="black"
            >
                <Tabs variant='soft-rounded'>
                    <TabList mb="1em">
                        {/* mb means Margin Bottom */}
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
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
    )
}

export default Home