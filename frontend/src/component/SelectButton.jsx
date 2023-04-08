import { Box } from "@chakra-ui/react";

const SelectButton = ({ children, selected, onClick }) => {

const bgColor = selected ? "gold" : "";
const color = selected ? "black" : "";

return (
<Box
onClick={onClick}
border="1px solid gold"
borderRadius={5}
p={2}
pl={4}
pr={4}
fontFamily="Montserrat"
cursor="pointer"
bg={bgColor}
color={color}
fontWeight={selected ? 700 : 500}
_hover={{ bg: "gold", color: "black" }}
w="22%"
>
{children}
</Box>
);
};

export default SelectButton;