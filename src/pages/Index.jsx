
import React, { useState, useEffect } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { DragDropContext } from "react-beautiful-dnd";
import ComponentList from "../components/ComponentList";
import Canvas from "../components/Canvas";
import PropertiesPanel from "../components/PropertiesPanel";
import { renderComponent, componentCategories } from "../utils/componentUtils";

// Import images for components
import TextFieldImage from "../assets/text-field.png";
import RadioButtonImage from "../assets/radio-button.png";
import SliderImage from "../assets/slider.png";

// Update component categories with images
const updateComponentImages = () => {
  const updatedCategories = { ...componentCategories };
  
  // Add images to each component
  Object.keys(updatedCategories).forEach(category => {
    updatedCategories[category] = updatedCategories[category].map(item => {
      let image = TextFieldImage;
      if (item.type === "radio" || item.type === "checkbox") {
        image = RadioButtonImage;
      } else if (item.type === "slider") {
        image = SliderImage;
      }
      return { ...item, image };
    });
  });
  
  return updatedCategories;
};

const Index = () => {
  const [pages, setPages] = useState([{ id: "page-1", name: "Page 1", items: [] }]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Most Used Components"); // Default category
  const [nextComponentId, setNextComponentId] = useState(1);
  const [categoriesWithImages] = useState(updateComponentImages());

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
    console.log("Drag end result:", result);
    
    if (!result.destination) return;

    // When dragging from component list to canvas
    if (result.source.droppableId === "component-list" && result.destination.droppableId === "canvas") {
      // Get the category and the component
      const categoryItems = categoriesWithImages[selectedCategory];
      if (!categoryItems) return;
      
      const sourceIndex = result.source.index;
      if (sourceIndex >= categoryItems.length) return;
      
      // Generate a unique ID for the new component
      const newId = `component-${nextComponentId}`;
      setNextComponentId(prevId => prevId + 1);
      
      // Create new component with default position
      const component = categoryItems[sourceIndex];
      const newComponent = { 
        ...component, 
        id: newId,
        x: result.destination.x || 20,  // Default starting position
        y: result.destination.y || 20,
        width: 200,
        height: 100,
        zIndex: pages[activeTab].items.length + 1 // Ensure new components appear on top
      };
      
      const updatedPages = [...pages];
      updatedPages[activeTab].items = [...updatedPages[activeTab].items, newComponent];
      setPages(updatedPages);
      
      console.log("Added component:", newComponent);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex width="100%" height="100%">
          <ComponentList 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            componentCategories={categoriesWithImages} 
          />
          
          <Canvas 
            pages={pages}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            addNewPage={addNewPage}
            onDragEnd={onDragEnd}
            handleCanvasClick={handleCanvasClick}
            selectedComponent={selectedComponent}
            handleComponentClick={handleComponentClick}
            setPages={setPages}
            setSelectedComponent={setSelectedComponent}
            renderComponent={renderComponent}
          />
          
          <PropertiesPanel 
            selectedComponent={selectedComponent}
            handleSettingChange={handleSettingChange}
          />
        </Flex>
      </DragDropContext>
    </Container>
  );
};

export default Index;
