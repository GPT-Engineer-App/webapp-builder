import React, { useState } from "react";
import { Container, VStack, Box, Text, Input, Radio, RadioGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Rnd } from "react-rnd";

const initialItems = [
  { id: "1", content: "Text Field", type: "input" },
  { id: "2", content: "Radio Button", type: "radio" },
  { id: "3", content: "Slider", type: "slider" },
];

const Index = () => {
  const [items, setItems] = useState(initialItems);
  const [pages, setPages] = useState([{ id: "page-1", name: "Page 1", items: initialItems }]);
  const [activeTab, setActiveTab] = useState(0);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (result.source.droppableId === "component-list" && result.destination.droppableId === "canvas") {
      const newItem = { ...initialItems[sourceIndex], id: `${pages[activeTab].items.length + 1}` };
      const updatedPages = [...pages];
      updatedPages[activeTab].items = [...updatedPages[activeTab].items, newItem];
      setPages(updatedPages);
    } else if (result.source.droppableId === "canvas" && result.destination.droppableId === "canvas") {
      const reorderedItems = Array.from(pages[activeTab].items);
      const [removed] = reorderedItems.splice(sourceIndex, 1);
      reorderedItems.splice(destinationIndex, 0, removed);

      const updatedPages = [...pages];
      updatedPages[activeTab].items = reorderedItems;
      setPages(updatedPages);
    }
  };

  const addNewPage = () => {
    const newPage = { id: `page-${pages.length + 1}`, name: `Page ${pages.length + 1}`, items: [] };
    setPages([...pages, newPage]);
    setActiveTab(pages.length);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Flex width="100%" height="100%">
        <Box width="20%" height="100%" overflowY="auto" borderRight="1px" borderColor="gray.200" p={4}>
          <Text fontSize="2xl" mb={4}>Components</Text>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="component-list" isDropDisabled={true}>
              {(provided) => (
                <VStack {...provided.droppableProps} ref={provided.innerRef} spacing={4} width="100%">
                  {initialItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
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
                          {item.content}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
        <Box width="80%" height="100%" p={4}>
          <Tabs index={activeTab} onChange={(index) => setActiveTab(index)} variant="enclosed">
            <TabList>
              {pages.map((page, index) => (
                <Tab key={page.id}>{page.name}</Tab>
              ))}
              <Tab onClick={addNewPage}>+</Tab>
            </TabList>
            <TabPanels>
              {pages.map((page, index) => (
                <TabPanel key={page.id} p={0}>
                  <Box border="1px" borderColor="gray.200" p={4} width="100%" height="600px" overflow="auto">
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="canvas">
                        {(provided) => (
                          <VStack {...provided.droppableProps} ref={provided.innerRef} spacing={4} width="100%">
                            {page.items.map((item, index) => (
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
                                      {item.type === "input" && <Input placeholder="Text Field" />}
                                      {item.type === "radio" && (
                                        <RadioGroup>
                                          <Radio value="1">Option 1</Radio>
                                          <Radio value="2">Option 2</Radio>
                                        </RadioGroup>
                                      )}
                                      {item.type === "slider" && (
                                        <Slider defaultValue={30}>
                                          <SliderTrack>
                                            <SliderFilledTrack />
                                          </SliderTrack>
                                          <SliderThumb />
                                        </Slider>
                                      )}
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
                  </Box>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
};

export default Index;