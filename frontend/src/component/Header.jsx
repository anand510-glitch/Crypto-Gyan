import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Select,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { CryptoState } from '../CrptoContext';



export default function Header() {


  
  const navigate=useNavigate();

  const {currency,setCurrency}=CryptoState();
  console.log(currency);
 
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box boxShadow='dark-lg' bg={useColorModeValue('gray.100', 'gray.900')} px={5} >
        
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex cursor={'pointer'}  onClick={()=>navigate("/") }>
           
            <Avatar name='CG' src='https://zebpay.com/in/wp-content/uploads/2023/02/Group-15807.png' /> 
            <Heading  size={{ base: 0, md: "lg", lg: "lg" }} >CG</Heading>
            </Flex>
            
          <Flex alignItems={'center'} >
            
            <Stack direction={'row'} spacing={7}>
              <Button boxShadow='lg' onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Stack spacing={3}>
  <Select boxShadow='lg'variant='Selecg' placeholder='Select Currency' value={currency} o onChange={(e) => setCurrency(e.target.value)} >
  <option value='USD'>USD</option>
  <option value='INR'>INR</option>
    </Select>
  
</Stack>
             
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}