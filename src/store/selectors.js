export const getBlockIds = (state) => state.ids;
export const getBlockData = (state) => state.data;
export const getSelectedId = (state) => state.selectedId;
export const getBlockCountByType = (type) => (state) => state.ids.filter((id) => state.data[id].type === type).length;
