import { Box ,Heading,Container, Center, Flex, useColorMode} from '@chakra-ui/react';
import Carasoul from './carasoul';
const Banner = () => {
 const {colorMode}=useColorMode()
 const lightMode="url('https://global-uploads.webflow.com/62a124d5fa609b0701aa0393/63868bcec700876e9540aaad_what-are-crypto-tokens.jpeg')"
 const darkMode="url('https://u.today/sites/default/files/styles/1600x900/public/2022-12/29426.jpg')"
  return (
    <Flex flexDirection='column'>
    <Box
      bgImage={colorMode==="light"?lightMode:darkMode}
      h="400px" // set the height of the banner
      backgroundSize="cover" // set the background image size to cover the whole box
      backgroundPosition="center" // center the background image horizontally and vertically
      >
        <Center>
        
        </Center>
        <Flex flexDirection='column' justifyContent='flex-end' h="50%">
          <Container>
            {/* your content */}
          </Container>
          <Carasoul/>
        </Flex>
    </Box>
    </Flex>
  );
};

export default Banner;
