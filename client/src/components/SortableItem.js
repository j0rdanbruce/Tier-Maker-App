import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const Item = (props) => {
  const { id } = props;

  return (
    <div>
      {id}
    </div>
  );
}

export function SortableItem(props) {
  const { id } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    border: '1px solid',
    width: '50px',
    height: 'auto',
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={id}/>
    </div>
  );
}