import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    position: 'relative',
    border: '1px solid',
    width: 'auto',
    height: '90px',
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
      <div className='settings-box'
        style={{
          position: 'absolute',
          width: '60px',
          height: '100%',
          top: 0,
          right: 0,
          backgroundColor: 'grey',
        }}
      >
        hello
      </div>
    </div>
  );
}