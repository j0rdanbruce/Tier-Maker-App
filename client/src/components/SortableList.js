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
import { array } from 'prop-types';

const SortableList = () => {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState({
    'root': [1, 2, 3],
    'A': [4, 5, 6],
    'B': [7, 8, 9]
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  //code block that handles the emitted event from servers.
  //changes sortable order for all connected clients.
  
  socket.on('sort change event', (values) => {
    setItems((items) => ({
      ...items,
      [values.container]: arrayMove(items[values.container], values.oldIndex, values.newIndex)
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
        id="root"
        items={items.root}
      />
      <Container
        id="A"
        items={items.A}
      />
      <Container
        id="B"
        items={items.B}
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
      const overIndex = overItems.indexOf(over.id);
      socket.emit('sort change event', {
        container: overContainer,
        activeIndex: activeIndex,
        overIndex: overIndex
      });

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, overIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(overIndex)
        ]
      };
    });
  }
  
  function handleDragEnd(event) {
    const {active, over} = event;
    const activeContainer = String(findContainer(active.id));

    if (active.id !== over.id) {
      const oldIndex = items[activeContainer].indexOf(active.id);
      const newIndex = items[activeContainer].indexOf(over.id);
      socket.emit('sort change event', {
        container: activeContainer,
        oldIndex: oldIndex,
        newIndex: newIndex
      });
    }
  }
}

export default SortableList;