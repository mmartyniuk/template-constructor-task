import { v4 as getUniqueId } from 'uuid';
import * as constants from 'store/constants';
import { STORAGE_KEY } from 'constants/config';

const rewriteLocalState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const initialState = {
  data: {},
  ids: [],
  selectedId: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
  case constants.COPY_BLOCK: {
    const id = getUniqueId();

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

    const { selectedId, ...restStateValues } = newState;

    rewriteLocalState(restStateValues);

    return newState;
  }

  case constants.ADD_BLOCK: {
    const id = getUniqueId();

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

    const { selectedId, ...restStateValues } = newState;

    rewriteLocalState(restStateValues);

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

    const { selectedId, ...restStateValues } = newState;

    rewriteLocalState(restStateValues);

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

    const { selectedId, ...restStateValues } = newState;

    rewriteLocalState(restStateValues);

    return newState;
  }

  case constants.MOVE_UP_BLOCK: {
    const index = state.ids.indexOf(action.payload.id);
    const newIds = [...state.ids];

    newIds.splice(index - 1, 2, newIds[index], newIds[index - 1]);

    const newState = { ...state, ids: newIds };

    const { selectedId, ...restStateValues } = newState;

    rewriteLocalState(restStateValues);

    return newState;
  }

  case constants.MOVE_DOWN_BLOCK: {
    const index = state.ids.indexOf(action.payload.id);
    const newIds = [...state.ids];

    newIds.splice(index, 2, newIds[index + 1], newIds[index]);

    const newState = { ...state, ids: newIds };

    const { selectedId, ...restStateValues } = newState;

    rewriteLocalState(restStateValues);

    return newState;
  }

  case constants.SELECT_BLOCK: {
    return {
      ...state,
      selectedId: action.payload.id,
    };
  }

  case constants.DESELECT_BLOCK: {
    return {
      ...state,
      selectedId: null,
    };
  }

  case constants.RESET: {
    const newState = { ...initialState };

    const { selectedId, ...restStateValues } = newState;

    rewriteLocalState(restStateValues);

    return newState;
  }

  default:
    return state;
  }
};
