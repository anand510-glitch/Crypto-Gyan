import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import NewsItem from "./NewsItem";
import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsCards = () => {
  const url =
    "https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=ca1e341ca8014d18a653bb08e5c968c9";
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get(url);
      setArticles(response.data.articles);
      console.log(response);
    };

    getArticles();
  }, []);

  return (
    articles?
    <Container  maxW="80%" >
    
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", xl: "repeat(2, 1fr)" }}
      gap={{ base: 4, md: 7 }}
      justifyContent="center" 
    >
      {articles?.map((article) => {

        return (
          <GridItem key={article.url}>
            <NewsItem
              name={article.source.name}
              title={article.title}
              description=   {article.description}
              url={article.url}
              urlToImage={article.urlToImage}
              author={article.author}
              published={article.publishedAt}
            />
          </GridItem>
        );
      })}
    </Grid>
    </Container>:" loading"
  );
};

export default NewsCards;
