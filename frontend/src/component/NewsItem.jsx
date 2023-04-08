import React from 'react'
import {
 CardFooter,Card,Image,CardBody,CardHeader,Box,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
  Flex,
  Container
} from '@chakra-ui/react';
import ReactHtmlParser from "react-html-parser"
const NewsItem = ({ title, description, url, urlToImage, author, published, name }) => {
  return (
    <Card maxW={{ base: "sm", md: "md"}} m={7} boxShadow={"dark-lg"}>
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name={name}src={urlToImage} />
          <Text><b>{name}</b></Text>
        <Box>
          <Heading size='sm'>{title}</Heading>
          <Text>{description}</Text>
          <Text><a href={url}><b>Read More</b></a></Text>
        </Box>
      </Flex>
     
    </Flex>
  </CardHeader>
  
  <Image
    objectFit='cover'
    src={urlToImage?urlToImage:'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}
    alt={name}
    maxH={"200px"}
  />

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
   
  </CardFooter>
</Card>
  )
}

export default NewsItem
