import React, {useState} from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { Container } from './Container';
import { socket } from '../socket';

const SortableList = () => {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState({
    'root': [1, 2, 3, 4, 5, 6],
    'A': [],
    'B': []
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  //code block that handles the emitted event from servers.
  //changes sortable order for all connected clients.
  socket.on('sort different container', (values) => {
    const {
      activeContainer,
      overContainer,
      activeContainerValue,
      overContainerValue
    } = values;
    
    setItems((items) => ({
      ...items,
      [activeContainer]: activeContainerValue,
      [overContainer]: overContainerValue
    }));
  });

  socket.on('sort change event', (values) => {
    const {
      activeContainer,
      activeIndex,
      overIndex
    } = values;

    setItems((prev) => ({
      ...prev,
      [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex)
    }));
  });

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Container
        id="A"
        items={items.A}
      />
      <Container
        id="B"
        items={items.B}
      />
      <Container
        id="root"
        items={items.root}
      />
    </DndContext>
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over } = event;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      const activeIndex = activeItems.indexOf(active.id);
      const overIndex =  overItems.indexOf(over.id);

      let newIndex;
      if (over.id in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isToRightOfLastItem =
          over &&
          overIndex === overItems.length - 1

        const modifier = isToRightOfLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        newIndex = overIndex >= 0 ? overIndex : overItems.length + 1;
      }
      
      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex)
        ]
      };
    });
    
    socket.emit('sort different container', {
      activeContainer: activeContainer,
      overContainer: overContainer,
      activeContainerValue: items[activeContainer],
      overContainerValue: items[overContainer]
    })
  }
  
  function handleDragEnd(event) {
    const {active, over} = event;
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer ||
        !overContainer ||
        activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[activeContainer].indexOf(over.id);

    if (activeIndex !== overIndex) {
      setItems((prev) => ({
        ...prev,
        [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex)
      }));
    }

    socket.emit('sort change event', {
      activeContainer: activeContainer,
      activeIndex: activeIndex,
      overIndex: overIndex
    });
  }
}

export default SortableList;