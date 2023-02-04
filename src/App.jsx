import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLayout, addtoLayout } from './features/dnd/layoutSlice';

import './App.css';
import Draggable from './components/Draggable';
import DropZone from './components/DropZone';

function App() {
  const [formInput, setFormInput] = useState('');
  const layout = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  function onSubmitHandler(e) {
    e.preventDefault();

    if (formInput.length)
      dispatch(
        addtoLayout({
          content: formInput,
        }),
      );

    setFormInput('');
  }

  function onDragStart(event, category) {
    event.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        id: event.target.id,
        content: event.target.textContent,
        category,
      }),
    );
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  function onDrop(event, targetCategory) {
    const item = event.dataTransfer.getData('text/plain');
    const parsedItem = JSON.parse(item);

    dispatch(
      updateLayout({
        oldCategory: parsedItem.category,
        id: parsedItem.id,
        content: parsedItem.content,
        newCategory: targetCategory,
      }),
    );
  }

  return (
    <div className='flow'>
      <form onSubmit={onSubmitHandler}>
        <input
          type='text'
          placeholder='Write your task...'
          value={formInput}
          onChange={(e) => setFormInput(e.target.value)}
        />
        <button type='submit'>Add</button>
      </form>

      <div style={{ display: 'flex', gap: '1rem' }}>
        {Object.keys(layout).map((category) => (
          <DropZone
            key={category}
            category={category}
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            <h2 className='dropZone__category'>{layout[category].name}</h2>
            <div className='flow' style={{ padding: '1rem' }}>
              {layout[category].items.length
                ? layout[category].items.map((item) => (
                    <Draggable
                      key={item.id}
                      id={item.id}
                      content={item.content}
                      parentCategory={category}
                      onDragStart={onDragStart}
                    />
                  ))
                : null}
            </div>
          </DropZone>
        ))}
      </div>
    </div>
  );
}

export default App;
