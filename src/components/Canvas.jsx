
import React from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CanvasItem from "./CanvasItem";

const Canvas = ({ 
  pages, 
  activeTab, 
  setActiveTab, 
  addNewPage, 
  onDragEnd, 
  handleCanvasClick, 
  selectedComponent, 
  handleComponentClick, 
  setPages, 
  setSelectedComponent,
  renderComponent
}) => {
  return (
    <Box width="60%" height="100%" p={4}>
      <Tabs index={activeTab} onChange={(index) => setActiveTab(index)} variant="enclosed">
        <TabList>
          {pages.map((page) => (
            <Tab key={page.id}>{page.name}</Tab>
          ))}
          <Tab onClick={addNewPage}>+</Tab>
        </TabList>
        <TabPanels>
          {pages.map((page) => (
            <TabPanel key={page.id} p={0}>
              <DragDropContext onDragEnd={onDragEnd}>
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
                  <Droppable droppableId="canvas" isDropDisabled={false}>
                    {(provided, snapshot) => (
                      <Box 
                        {...provided.droppableProps} 
                        ref={provided.innerRef} 
                        width="100%" 
                        height="100%" 
                        position="relative"
                        bg={snapshot.isDraggingOver ? "gray.50" : "white"}
                      >
                        {page.items.map((item) => (
                          <CanvasItem
                            key={item.id}
                            item={item}
                            selectedComponent={selectedComponent}
                            handleComponentClick={handleComponentClick}
                            pages={pages}
                            activeTab={activeTab}
                            setPages={setPages}
                            setSelectedComponent={setSelectedComponent}
                            renderComponent={renderComponent}
                          />
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Box>
              </DragDropContext>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Canvas;
