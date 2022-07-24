import { v4 as uuidv4 } from 'uuid';
import * as constants from 'store/constants';

const initialState = {
  data: {},
  ids: [],
  selectedId: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.COPY_BLOCK: {
    const id = uuidv4();

    const newState = {
      ...state,
      ids: [...state.ids, id],
      data: {
        ...state.data,
        [id]: {
          ...state.data[action.payload.id],
        },
      },
    };

    localStorage.setItem('blocks-test-task', JSON.stringify(newState));

    return newState;
  }
  case constants.ADD_BLOCK: {
    const id = uuidv4();
    const newState = {
      ...state,
      ids: [...state.ids, id],
      data: {
        ...state.data,
        [id]: {
          ...action.payload,
        },
      },
    };

    localStorage.setItem('blocks-test-task', JSON.stringify(newState));

    return newState;
  }
  case constants.EDIT_BLOCK: {
    const newState = {
      ...state,
      data: {
        ...state.data,
        [action.payload.id]: {
          ...state.data[action.payload.id],
          content: action.payload.content,
        },
      },
    };

    localStorage.setItem('blocks-test-task', JSON.stringify(newState));

    return newState;
  }
  case constants.REMOVE_BLOCK: {
    const updatedData = { ...state.data };

    delete updatedData[action.payload.id];

    const newState = {
      ...state,
      ids: state.ids.filter((i) => i !== action.payload.id),
      data: updatedData,
    };

    localStorage.setItem('blocks-test-task', JSON.stringify(newState));

    return newState;
  }

  case constants.MOVE_UP_BLOCK: {
    const index = state.ids.indexOf(action.payload.id);
    const newIds = [...state.ids];

    newIds.splice(index - 1, 2, newIds[index], newIds[index - 1]);

    const newState = { ...state, ids: newIds };

    localStorage.setItem('blocks-test-task', JSON.stringify(newState));

    return newState;
  }

  case constants.MOVE_DOWN_BLOCK: {
    const index = state.ids.indexOf(action.payload.id);
    const newIds = [...state.ids];

    newIds.splice(index, 2, newIds[index + 1], newIds[index]);

    const newState = { ...state, ids: newIds };

    localStorage.setItem('blocks-test-task', JSON.stringify(newState));

    return newState;
  }
  case constants.SELECT_BLOCK: {
    const newState = { ...state, selectedId: action.payload.id };

    localStorage.setItem('blocks-test-task', JSON.stringify(newState));

    return newState;
  }
  case constants.DESELECT_BLOCK: {
    const newState = { ...state, selectedId: null };

    localStorage.setItem('blocks-test-task', JSON.stringify(newState));

    return newState;
  }
  default:
    return state;
  }
};
