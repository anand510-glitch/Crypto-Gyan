
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import "./cointable.css"
import {Box,
  Center,
  Container,
  Heading,
  Input,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { CryptoState } from "../CrptoContext";
import { CoinList } from "../config/api";
import React, { useState,useEffect } from "react";
import NewsCards from "./NewsCards";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [perPage] = useState(10); // set number of coins per page
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
   
  }, [currency]);

  const navigate = useNavigate();

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const pageCount = Math.ceil(handleSearch().length / perPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setPage(selectedPage);
  };

  return (
    <div>
      <Container maxW="1200px">
       
        <Center>
        <Heading size={{ base: 'sm', md: 'md', lg: 'lg' }} bgShadow={"lg"} m={10}> Cryptocurrency Price By MarketCap</Heading> 
        </Center>
       
        <Input
          onChange={(e) => setSearch(e.target.value)}
          size="lg"
          mt={2}
          boxShadow="dark-lg"
        />
        <Box overflowX="auto">
        <TableContainer boxShadow="dark-lg" mt={4} size='dark-lg'>
          {loading ? (
            <Progress size="xs" isIndeterminate />
          ) : (
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr style={{gap:15}}>
                  
                   <Th
                      
                     
                      style={{backgroundColor:"purple" ,fontSize: 20,color:"white"}}
                    >
                      Coin
                    </Th> 
                   <Th
                      
                     
                      style={{backgroundColor:"purple" ,fontSize: 20,color:"white"}}
                    >
                      Price
                    </Th> 
                   <Th
                      
                      className="hide-on-small"
                      style={{backgroundColor:"purple" ,fontSize: 20,color:"white"}}
                    >
                     24h Change
                    </Th> 
                   <Th
                      className="hide-on-small"
                     
                      style={{backgroundColor:"purple" ,fontSize: 20,color:"white"}}
                    >
                     Market Cap
                    </Th> 
                </Tr>
              </Thead>
              <Tbody>
                {handleSearch()
                  .slice((page - 1) * perPage, page * perPage)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <Tr
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                        style={{
                          cursor: "pointer",
                          "&:hover": {
                            background: "#131111",
                          },
                        }}
                      >
                        <Th style={{ display: "flex", gap: 15 }}>
                          <img
                            src={row?.image}
                            alt={row.name}
                            style={{ width: "30px", height: "30px" }}
                          />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span
                              style={{
                                color: "darkgrey",
                                textTransform: "capitalize",
                              }}
                            >
                              {row.name}
                            </span>
                          </div>
                        </Th>
                        <Th>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </Th>
                        <Th className="hide-on-small"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            
                          }}
                        >
                          {profit ? "+" : "-"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </Th>
                        <Th className="hide-on-small">
                          {symbol} {numberWithCommas(row.market_cap).slice(0, -6)}
                        </Th>
                      </Tr>
                    );
                  })}
              </Tbody> 
            </Table>
          )}
          
        </TableContainer>
        </Box>
        <Box mt={4}>
          <ReactPaginate className="pagination"
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
          
        </Box>
       <Center> <Heading size={{ base: 'sm', md: 'md', lg: 'lg' }}>Latest news about Crypto</Heading></Center>
      </Container>
    </div>
);
};    
export default CoinsTable