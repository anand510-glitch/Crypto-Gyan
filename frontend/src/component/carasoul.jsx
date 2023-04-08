import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api'
import { CryptoState } from '../CrptoContext'
import axios from "axios"
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { Container, Stack ,AbsoluteCenter, Box, Flex, Center, background} from '@chakra-ui/react';



const Carasoul = () => {
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();
  
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
  
      console.log(data);
      setTrending(data);
    };
  
    useEffect(() => {
      fetchTrendingCoins();
   
    }, [currency]);




    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;
      
        return (
          <Box   >
            
              <Link to={`/coins/${coin.id}`}  boxShadow='dark-lg' style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontWeight:"bold"
                  
                  
              }}>
                <img
                  src={coin?.image}
                  alt={coin.name}
                  style={{  margin: 'auto', width: '100px', height: '100px'}}
                />
                <span style={{fontSize:"large"}}>
                  {coin?.symbol}
                  &nbsp;
                  <span
                    style={{
                      color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {profit && '+'}
                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </span>
              </Link>
            
          </Box>
        );
      });
      

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div style={{  height: "50%",
    display: "flex",
    alignItems: "center",}} >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
      
    </div>
    
  );
};

export default Carasoul
