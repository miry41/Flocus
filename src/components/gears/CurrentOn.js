// src/components/gears/CurrentOn.js
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const CurrentOn = ({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="list-group-item"
            >
              <div>{task.content}</div>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default CurrentOn;
