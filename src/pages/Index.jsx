import React, { useState } from "react";
import { Container, VStack, Box, Text, Button } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Rnd } from "react-rnd";

const initialItems = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
];

const Index = () => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Drag and Drop Builder</Text>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <VStack {...provided.droppableProps} ref={provided.innerRef} spacing={4} width="100%">
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <Rnd
                        default={{
                          x: 0,
                          y: 0,
                          width: 320,
                          height: 200,
                        }}
                        minWidth={100}
                        minHeight={100}
                        bounds="parent"
                      >
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
                          {item.content}
                        </Box>
                      </Rnd>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </VStack>
            )}
          </Droppable>
        </DragDropContext>
        <Button colorScheme="teal" onClick={() => setItems([...items, { id: `${items.length + 1}`, content: `Item ${items.length + 1}` }])}>
          Add Item
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;