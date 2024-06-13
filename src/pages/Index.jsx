import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Text, Input, Radio, RadioGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Select, Button } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Rnd } from "react-rnd";

// Import images for components
import TextFieldImage from "../assets/text-field.png";
import RadioButtonImage from "../assets/radio-button.png";
import SliderImage from "../assets/slider.png";

const initialItems = [
  { id: "1", content: "Text Field", type: "input", image: TextFieldImage },
  { id: "2", content: "Radio Button", type: "radio", image: RadioButtonImage },
  { id: "3", content: "Slider", type: "slider", image: SliderImage },
];

const componentCategories = {
  "Most Used Components": [
    { id: "1", content: "Text Field", type: "input", image: TextFieldImage },
    { id: "2", content: "Button", type: "button", image: TextFieldImage },
    { id: "3", content: "Simple List", type: "list", image: TextFieldImage },
    { id: "4", content: "App Bar", type: "appbar", image: TextFieldImage },
    { id: "5", content: "Image", type: "image", image: TextFieldImage },
    { id: "6", content: "Form", type: "form", image: TextFieldImage },
  ],
  // Add other categories similarly...
};

const Index = () => {
  const [items, setItems] = useState(initialItems);
  const [pages, setPages] = useState([{ id: "page-1", name: "Page 1", items: initialItems }]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" && selectedComponent) {
        const updatedPages = [...pages];
        updatedPages[activeTab].items = updatedPages[activeTab].items.filter(item => item.id !== selectedComponent.id);
        setPages(updatedPages);
        setSelectedComponent(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedComponent, pages, activeTab]);

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

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    const updatedPages = [...pages];
    const updatedItems = updatedPages[activeTab].items.map(item => {
      if (item.id === selectedComponent.id) {
        return { ...item, [name]: value };
      }
      return item;
    });
    updatedPages[activeTab].items = updatedItems;
    setPages(updatedPages);
    setSelectedComponent({ ...selectedComponent, [name]: value });
  };

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Flex width="100%" height="100%">
        <Box width="20%" height="100%" overflowY="auto" borderRight="1px" borderColor="gray.200" p={4}>
          <Text fontSize="2xl" mb={4}>Components</Text>
          <Select placeholder="Select category">
            {Object.keys(componentCategories).map((category) => (
              <optgroup label={category} key={category}>
                {componentCategories[category].map((item) => (
                  <option key={item.id} value={item.id}>{item.content}</option>
                ))}
              </optgroup>
            ))}
          </Select>
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
                          <img src={item.image} alt={item.content} style={{ width: "100%", height: "auto" }} />
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
        <Box width="60%" height="100%" p={4}>
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
                                      x: item.x || 0,
                                      y: item.y || 0,
                                      width: item.width || 320,
                                      height: item.height || 200,
                                    }}
                                    minWidth={100}
                                    minHeight={100}
                                    bounds="parent"
                                    onClick={() => handleComponentClick(item)}
                                    onDragStop={(e, d) => {
                                      const updatedPages = [...pages];
                                      const updatedItems = updatedPages[activeTab].items.map(i => {
                                        if (i.id === item.id) {
                                          return { ...i, x: d.x, y: d.y };
                                        }
                                        return i;
                                      });
                                      updatedPages[activeTab].items = updatedItems;
                                      setPages(updatedPages);
                                    }}
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
        <Box width="20%" height="100%" overflowY="auto" borderLeft="1px" borderColor="gray.200" p={4}>
          <Text fontSize="2xl" mb={4}>Component Settings</Text>
          {selectedComponent && (
            <Box>
              <Text>ID: {selectedComponent.id}</Text>
              <Text>Type: {selectedComponent.type}</Text>
              <Text>Content: {selectedComponent.content}</Text>
              <Input name="width" placeholder="Width" value={selectedComponent.width || ""} onChange={handleSettingChange} />
              <Input name="height" placeholder="Height" value={selectedComponent.height || ""} onChange={handleSettingChange} />
              <Input name="color" placeholder="Color" value={selectedComponent.color || ""} onChange={handleSettingChange} />
              <Input name="font" placeholder="Font" value={selectedComponent.font || ""} onChange={handleSettingChange} />
              {/* Add more settings as needed */}
            </Box>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default Index;