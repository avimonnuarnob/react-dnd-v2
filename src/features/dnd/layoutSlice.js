import { createSlice } from '@reduxjs/toolkit';
import { revisedRandId } from '../../lib/helper';
import { DOING, DONE, TODO } from '../../lib/constant';

const initialState = {
  [TODO]: {
    name: 'ToDo',
    items: [
      {
        id: revisedRandId(),
        content: 'Task 01',
      },
    ],
  },
  [DOING]: {
    name: 'Doing',
    items: [],
  },
  [DONE]: {
    name: 'Done',
    items: [],
  },
};

export const layoutSlice = createSlice({
  name: 'dndLayout',
  initialState,
  reducers: {
    addtoLayout: (state, { payload }) => {
      state[TODO].items.push({
        id: revisedRandId(),
        content: payload.content,
      });
    },
    updateLayout: (state, { payload }) => {
      // remove from old category
      state[payload.oldCategory].items = state[
        payload.oldCategory
      ].items.filter((el) => el.id !== payload.id);
      // add in new category
      state[payload.newCategory].items.push({
        id: payload.id,
        content: payload.content,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtoLayout, updateLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
