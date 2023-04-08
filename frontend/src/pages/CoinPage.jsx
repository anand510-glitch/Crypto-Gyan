import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CrptoContext'
import axios from 'axios'
import { SingleCoin } from '../config/api'
import CoinInfo from '../component/CoinInfo'
import { Container, Heading, Progress, Box, Stack, Image, Text ,Center, useColorModeValue } from '@chakra-ui/react'
import "./CoinInfo.css";
import { numberWithCommas } from '../component/CoinsTable'
import ReactHtmlParser from "react-html-parser"

const CoinPage = () => {

  const {id}=useParams();
  const[coin,setCoin]=useState()
  const {currency,symbol} =CryptoState();

  const fetchCoin=async()=>{
    const{data}=await axios.get(SingleCoin(id));
    setCoin(data);
  }

  console.log(coin)
  useEffect(()=>{
    fetchCoin();
  },[])

  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "gray.100");

  if(!coin) return <Progress size='xs' isIndeterminate />

  return (
   
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 4, md: 1}}
        mt={{ base: 2, md: 3 }}
      >
        <Box
        ml={"3"}
          w={{ base: "90%", md: "30%" }}

          boxShadow="dark-lg"
          borderRadius="lg"
          p={{ base: 4, md: 6 }}
          mr={{ md: 1 }}
          justifyContent="center"
          alignItems="center"
         
        >
          <Center>
          <Image
            src={coin?.image.large} 
            alt={coin.name}
            height="200"
            mb={{ base: 4, md: 6 }}
          />
          </Center>
          <Center>
          <Heading as="h2" size="xl" mb={{ base: 2, md: 4 }} color={headingColor} fontFamily="heading">
            {coin.name}
          </Heading>
          </Center>
          <Center>
          <Text fontSize="lg" mb={{ base: 4, md: 6 }} color={textColor} fontFamily="body" maxHeight="20em" overflow="hidden">
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
</Text>

          </Center>
          
          <Text fontSize="md" color={textColor} fontFamily="body">
            Rank : {coin.market_cap_rank}
          </Text>
          
          
          <Text fontSize="md" color={textColor} fontFamily="body">
            Current Price : 
            {symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
          </Text>
          
          <Text fontSize="md" color={textColor} fontFamily="body">
          Market Cap:  {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
          </Text>
          


          

        </Box>
        <Box
          w={{ base: "100%", md: "70%" }}
          boxShadow="dark-lg"
          borderRadius="lg"
          p={{ base:2, md: 3 }}
       
          >
          <CoinInfo coin={coin} />
        </Box>
      </Stack>
    )
    }
    
    export default CoinPage;
