
import React from "react";
import { Box } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";

const ComponentItem = ({ item, index }) => {
  return (
    <Draggable 
      key={item.id} 
      draggableId={item.id} 
      index={index}
    >
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          p={4}
          bg="gray.100"
          width="100%"
          textAlign="center"
          borderRadius="md"
          boxShadow="md"
        >
          <img src={item.image} alt={item.content} style={{ width: "100%", height: "auto", marginBottom: "8px" }} />
          {item.content}
        </Box>
      )}
    </Draggable>
  );
};

export default ComponentItem;
