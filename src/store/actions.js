import * as constants from './constants';

export const addBlock = (payload) => ({
  type: constants.ADD_BLOCK,
  payload,
});

export const editBlock = (payload) => ({
  type: constants.EDIT_BLOCK,
  payload,
});

export const removeBlock = (payload) => ({
  type: constants.REMOVE_BLOCK,
  payload,
});

export const moveUpBlock = (payload) => ({
  type: constants.MOVE_UP_BLOCK,
  payload,
});

export const moveDownBlock = (payload) => ({
  type: constants.MOVE_DOWN_BLOCK,
  payload,
});

export const copyBlock = (payload) => ({
  type: constants.COPY_BLOCK,
  payload,
});

export const selectBlock = (payload) => ({
  type: constants.SELECT_BLOCK,
  payload,
});

export const deselectBlock = () => ({
  type: constants.DESELECT_BLOCK,
});
