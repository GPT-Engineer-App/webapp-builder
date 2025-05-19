
import React from "react";
import { Input, Radio, RadioGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb, VStack, Box, Flex, Text, Button, Select } from "@chakra-ui/react";

// Component rendering utility
export const renderComponent = (item) => {
  switch(item.type) {
    case "input":
      return <Input placeholder="Text Field" size="md" />;
    case "radio":
      return (
        <RadioGroup>
          <Radio value="1" mr={2}>Option 1</Radio>
          <Radio value="2">Option 2</Radio>
        </RadioGroup>
      );
    case "slider":
      return (
        <Slider defaultValue={30}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      );
    case "button":
      return <Button colorScheme="blue">Button</Button>;
    case "list":
      return (
        <VStack align="stretch" spacing={2}>
          <Box p={2} bg="gray.100">List Item 1</Box>
          <Box p={2} bg="gray.100">List Item 2</Box>
          <Box p={2} bg="gray.100">List Item 3</Box>
        </VStack>
      );
    case "appbar":
      return (
        <Flex bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold">App Title</Text>
          <Flex>
            <Box mx={2}>Menu 1</Box>
            <Box mx={2}>Menu 2</Box>
          </Flex>
        </Flex>
      );
    case "image":
      return (
        <Box 
          bg="gray.200" 
          height="100%" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
        >
          <Text>Image Placeholder</Text>
        </Box>
      );
    case "form":
      return (
        <VStack spacing={3} align="stretch">
          <Input placeholder="Name" />
          <Input placeholder="Email" />
          <Button colorScheme="blue">Submit</Button>
        </VStack>
      );
    case "checkbox":
      return (
        <VStack align="start">
          <Box><input type="checkbox" id="check1" /><label htmlFor="check1"> Option 1</label></Box>
          <Box><input type="checkbox" id="check2" /><label htmlFor="check2"> Option 2</label></Box>
        </VStack>
      );
    case "select":
      return (
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      );
    case "container":
      return (
        <Box border="1px dashed" borderColor="gray.300" p={4} textAlign="center">
          <Text>Container</Text>
        </Box>
      );
    case "grid":
      return (
        <Box>
          <Flex flexWrap="wrap">
            {[1, 2, 3, 4].map(i => (
              <Box key={i} width="50%" border="1px solid" borderColor="gray.300" p={2} textAlign="center">
                Grid {i}
              </Box>
            ))}
          </Flex>
        </Box>
      );
    case "flex":
      return (
        <Flex border="1px dashed" borderColor="gray.300" p={2} justifyContent="space-between">
          <Box p={1} bg="gray.100">Item 1</Box>
          <Box p={1} bg="gray.100">Item 2</Box>
          <Box p={1} bg="gray.100">Item 3</Box>
        </Flex>
      );
    case "stack":
      return (
        <VStack spacing={2} align="stretch" border="1px dashed" borderColor="gray.300" p={2}>
          <Box p={1} bg="gray.100">Item 1</Box>
          <Box p={1} bg="gray.100">Item 2</Box>
          <Box p={1} bg="gray.100">Item 3</Box>
        </VStack>
      );
    default:
      return <Text>Unknown Component: {item.type}</Text>;
  }
};

// Initial data
export const initialItems = [
  { id: "1", content: "Text Field", type: "input", image: null },
  { id: "2", content: "Radio Button", type: "radio", image: null },
  { id: "3", content: "Slider", type: "slider", image: null },
];

// Component categories
export const componentCategories = {
  "Most Used Components": [
    { id: "input-1", content: "Text Field", type: "input", image: null },
    { id: "button-1", content: "Button", type: "button", image: null },
    { id: "list-1", content: "Simple List", type: "list", image: null },
    { id: "appbar-1", content: "App Bar", type: "appbar", image: null },
    { id: "image-1", content: "Image", type: "image", image: null },
    { id: "form-1", content: "Form", type: "form", image: null },
  ],
  "Input Components": [
    { id: "input-2", content: "Text Field", type: "input", image: null },
    { id: "radio-1", content: "Radio Button", type: "radio", image: null },
    { id: "slider-1", content: "Slider", type: "slider", image: null },
    { id: "checkbox-1", content: "Checkbox", type: "checkbox", image: null },
    { id: "select-1", content: "Select", type: "select", image: null },
  ],
  "Layout Components": [
    { id: "container-1", content: "Container", type: "container", image: null },
    { id: "grid-1", content: "Grid", type: "grid", image: null },
    { id: "flex-1", content: "Flex", type: "flex", image: null },
    { id: "stack-1", content: "Stack", type: "stack", image: null },
  ]
};
