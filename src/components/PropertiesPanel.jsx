
import React from "react";
import { Box, Text, Input, Flex } from "@chakra-ui/react";

const PropertiesPanel = ({ selectedComponent, handleSettingChange }) => {
  return (
    <Box width="20%" height="100%" overflowY="auto" borderLeft="1px" borderColor="gray.200" p={4}>
      <Text fontSize="2xl" mb={4}>Component Settings</Text>
      {selectedComponent && (
        <Box>
          <Text mb={2}>ID: {selectedComponent.id}</Text>
          <Text mb={2}>Type: {selectedComponent.type}</Text>
          <Text mb={2}>Content: {selectedComponent.content}</Text>
          
          <Text fontWeight="bold" mt={4} mb={2}>Position</Text>
          <Flex mb={2}>
            <Box mr={2} width="50%">
              <Text size="sm">X Position</Text>
              <Input 
                name="x" 
                type="number" 
                value={selectedComponent.x || 0} 
                onChange={handleSettingChange}
                size="sm"
              />
            </Box>
            <Box width="50%">
              <Text size="sm">Y Position</Text>
              <Input 
                name="y" 
                type="number" 
                value={selectedComponent.y || 0} 
                onChange={handleSettingChange}
                size="sm"
              />
            </Box>
          </Flex>
          
          <Text fontWeight="bold" mt={4} mb={2}>Size</Text>
          <Flex mb={2}>
            <Box mr={2} width="50%">
              <Text size="sm">Width</Text>
              <Input 
                name="width" 
                type="number" 
                value={selectedComponent.width || 200} 
                onChange={handleSettingChange}
                size="sm"
              />
            </Box>
            <Box width="50%">
              <Text size="sm">Height</Text>
              <Input 
                name="height" 
                type="number" 
                value={selectedComponent.height || 100} 
                onChange={handleSettingChange}
                size="sm"
              />
            </Box>
          </Flex>
          
          <Text fontWeight="bold" mt={4} mb={2}>Styling</Text>
          <Text size="sm">Background Color</Text>
          <Input 
            name="backgroundColor" 
            placeholder="e.g. #ffffff or blue" 
            value={selectedComponent.backgroundColor || ""} 
            onChange={handleSettingChange}
            mb={2}
            size="sm"
          />
          
          <Text size="sm">Text Color</Text>
          <Input 
            name="color" 
            placeholder="e.g. #000000 or black" 
            value={selectedComponent.color || ""} 
            onChange={handleSettingChange}
            mb={2}
            size="sm"
          />
          
          <Text size="sm">Font Family</Text>
          <Input 
            name="fontFamily" 
            placeholder="e.g. Arial, sans-serif" 
            value={selectedComponent.fontFamily || ""} 
            onChange={handleSettingChange}
            mb={2}
            size="sm"
          />
        </Box>
      )}
    </Box>
  );
};

export default PropertiesPanel;
