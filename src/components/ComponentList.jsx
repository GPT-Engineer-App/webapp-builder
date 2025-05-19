
import React from "react";
import { Box, Text, Select, VStack } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import ComponentItem from "./ComponentItem";

const ComponentList = ({ selectedCategory, setSelectedCategory, componentCategories }) => {
  return (
    <Box width="20%" height="100%" overflowY="auto" borderRight="1px" borderColor="gray.200" p={4}>
      <Text fontSize="2xl" mb={4}>Components</Text>
      <Select 
        placeholder="Select category" 
        onChange={(e) => setSelectedCategory(e.target.value)} 
        mb={4}
        value={selectedCategory}
      >
        {Object.keys(componentCategories).map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Select>
      
      <Droppable droppableId="component-list" isDropDisabled={false}>
        {(provided) => (
          <VStack 
            {...provided.droppableProps} 
            ref={provided.innerRef} 
            spacing={4} 
            width="100%"
            align="stretch"
            minHeight="300px"
          >
            {selectedCategory && componentCategories[selectedCategory] && 
             componentCategories[selectedCategory].map((item, index) => (
              <ComponentItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </Box>
  );
};

export default ComponentList;
