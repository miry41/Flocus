import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import 'bootstrap/dist/css/bootstrap.min.css'

function CurrentTask() {
  const [currentTask, setCurrentTask] = useState([])

  const onDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(currentTask)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setCurrentTask(items)
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <div className="card">
            {/* カードヘッダーに「着手中」を表示 */}
            <div className="card-header">
              着手中
            </div>
            <div className="card-body">
              {/* タスクを配置するための枠 */}
              <div className="border rounded p-2" style={{ minHeight: '200px' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="currentTask">
                    {(provided) => (
                      <div 
                        className="list-group" 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                      >
                        {currentTask.length > 0 ? (
                          currentTask.map((task, index) => (
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
                          ))
                        ) : (
                          <p className="text-muted">現在のタスクがありません</p>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentTask
