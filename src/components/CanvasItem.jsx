
import React from "react";
import { Box } from "@chakra-ui/react";
import { Rnd } from "react-rnd";

const CanvasItem = ({ 
  item, 
  selectedComponent, 
  handleComponentClick, 
  pages, 
  activeTab, 
  setPages, 
  setSelectedComponent,
  renderComponent 
}) => {
  return (
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
        background: item.backgroundColor || 'white',
        color: item.color || 'inherit',
        fontFamily: item.fontFamily || 'inherit',
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
        {renderComponent(item)}
      </Box>
    </Rnd>
  );
};

export default CanvasItem;
