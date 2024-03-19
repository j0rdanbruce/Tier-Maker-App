/**
 * The component that acts as a Container for sortable items.
 */
import React from "react";

import { horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";

export const Container = (props) => {
  const { id, items } = props;
  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: id
  });
  const containerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '300px',
    height: '50px',
    padding: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderStyle: 'solid',
    backgroundColor: isOver ? "green" : "grey"
  };

  return (

    <SortableContext
      id={id}
      items={items}
      strategy={horizontalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        style={containerStyle}
      >
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
}