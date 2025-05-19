
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
  const [pages, setPages] = useState([{ id: "page-1", name: "Page 1", items: [] }]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [nextComponentId, setNextComponentId] = useState(1);

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
    
    // When dragging from component list to canvas
    if (result.source.droppableId === "component-list" && result.destination.droppableId === "canvas") {
      // Generate a unique ID for the new component
      const newId = `component-${nextComponentId}`;
      setNextComponentId(prevId => prevId + 1);
      
      // Create new component with default position
      const component = componentCategories[selectedCategory][sourceIndex];
      const newComponent = { 
        ...component, 
        id: newId,
        x: 20,  // Default starting position
        y: 20,
        width: 200,
        height: 100,
        zIndex: pages[activeTab].items.length + 1 // Ensure new components appear on top
      };
      
      const updatedPages = [...pages];
      updatedPages[activeTab].items = [...updatedPages[activeTab].items, newComponent];
      setPages(updatedPages);
    }
  };

  const addNewPage = () => {
    const newPage = { id: `page-${pages.length + 1}`, name: `Page ${pages.length + 1}`, items: [] };
    setPages([...pages, newPage]);
    setActiveTab(pages.length);
  };

  const handleComponentClick = (component, e) => {
    e.stopPropagation(); // Prevent canvas click from deselecting
    setSelectedComponent(component);
    
    // Bring component to front
    const updatedPages = [...pages];
    const updatedItems = updatedPages[activeTab].items.map(item => {
      if (item.id === component.id) {
        return { 
          ...item, 
          zIndex: Math.max(...updatedPages[activeTab].items.map(i => i.zIndex || 0)) + 1 
        };
      }
      return item;
    });
    
    updatedPages[activeTab].items = updatedItems;
    setPages(updatedPages);
  };
  
  const handleCanvasClick = () => {
    setSelectedComponent(null);
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
          <Select placeholder="Select category" onChange={(e) => setSelectedCategory(e.target.value)} mb={4}>
            {Object.keys(componentCategories).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="component-list" isDropDisabled={false}>
              {(provided) => (
                <VStack {...provided.droppableProps} ref={provided.innerRef} spacing={4} width="100%">
                  {selectedCategory && componentCategories[selectedCategory].map((item, index) => (
                    <Draggable key={item.id} draggableId={`template-${item.id}`} index={index}>
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
                  <Box 
                    border="1px" 
                    borderColor="gray.200" 
                    p={4} 
                    width="100%" 
                    height="600px" 
                    position="relative"
                    onClick={handleCanvasClick}
                    overflow="hidden"
                    bg="white"
                  >
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="canvas">
                        {(provided) => (
                          <Box 
                            {...provided.droppableProps} 
                            ref={provided.innerRef} 
                            width="100%" 
                            height="100%" 
                            position="relative"
                          >
                            {page.items.map((item) => (
                              <Rnd
                                key={item.id}
                                default={{
                                  x: item.x || 0,
                                  y: item.y || 0,
                                  width: item.width || 200,
                                  height: item.height || 100,
                                }}
                                position={{ x: item.x || 0, y: item.y || 0 }}
                                size={{ width: item.width || 200, height: item.height || 100 }}
                                style={{
                                  zIndex: item.zIndex || 1,
                                  border: selectedComponent && selectedComponent.id === item.id ? '2px solid blue' : '1px solid #ddd',
                                  borderRadius: '4px',
                                  background: 'white',
                                  boxShadow: selectedComponent && selectedComponent.id === item.id ? '0 0 10px rgba(0,0,255,0.3)' : 'none'
                                }}
                                minWidth={50}
                                minHeight={50}
                                bounds="parent"
                                onClick={(e) => handleComponentClick(item, e)}
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
                                  // Update selected component if it's the one being moved
                                  if (selectedComponent && selectedComponent.id === item.id) {
                                    setSelectedComponent({ ...selectedComponent, x: d.x, y: d.y });
                                  }
                                }}
                                onResizeStop={(e, direction, ref, delta, position) => {
                                  const width = ref.offsetWidth;
                                  const height = ref.offsetHeight;
                                  
                                  const updatedPages = [...pages];
                                  const updatedItems = updatedPages[activeTab].items.map(i => {
                                    if (i.id === item.id) {
                                      return { 
                                        ...i, 
                                        width, 
                                        height, 
                                        x: position.x, 
                                        y: position.y 
                                      };
                                    }
                                    return i;
                                  });
                                  
                                  updatedPages[activeTab].items = updatedItems;
                                  setPages(updatedPages);
                                  
                                  // Update selected component if it's the one being resized
                                  if (selectedComponent && selectedComponent.id === item.id) {
                                    setSelectedComponent({ 
                                      ...selectedComponent, 
                                      width, 
                                      height, 
                                      x: position.x, 
                                      y: position.y 
                                    });
                                  }
                                }}
                              >
                                <Box 
                                  p={2} 
                                  height="100%" 
                                  width="100%"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {item.type === "input" && <Input placeholder="Text Field" size="md" />}
                                  {item.type === "radio" && (
                                    <RadioGroup>
                                      <Radio value="1" mr={2}>Option 1</Radio>
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
                                  {item.type === "button" && (
                                    <Button>Button</Button>
                                  )}
                                  {item.type === "list" && (
                                    <VStack align="stretch" spacing={2}>
                                      <Box p={2} bg="gray.100">List Item 1</Box>
                                      <Box p={2} bg="gray.100">List Item 2</Box>
                                      <Box p={2} bg="gray.100">List Item 3</Box>
                                    </VStack>
                                  )}
                                  {item.type === "appbar" && (
                                    <Flex bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
                                      <Text fontWeight="bold">App Title</Text>
                                      <Flex>
                                        <Box mx={2}>Menu 1</Box>
                                        <Box mx={2}>Menu 2</Box>
                                      </Flex>
                                    </Flex>
                                  )}
                                  {item.type === "image" && (
                                    <Box 
                                      bg="gray.200" 
                                      height="100%" 
                                      display="flex" 
                                      alignItems="center" 
                                      justifyContent="center"
                                    >
                                      <Text>Image Placeholder</Text>
                                    </Box>
                                  )}
                                  {item.type === "form" && (
                                    <VStack spacing={3} align="stretch">
                                      <Input placeholder="Name" />
                                      <Input placeholder="Email" />
                                      <Button colorScheme="blue">Submit</Button>
                                    </VStack>
                                  )}
                                </Box>
                              </Rnd>
                            ))}
                            {provided.placeholder}
                          </Box>
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
      </Flex>
    </Container>
  );
};

export default Index;
