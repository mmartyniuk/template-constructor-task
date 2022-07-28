import { createStore } from 'redux';
import { STORAGE_KEY } from 'constants/config';
import { appReducer } from './reducer';

const createApplicationStore = () => {
  let preloadedState;

  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if(storedData) {
      preloadedState = JSON.parse(storedData);
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return createStore(
    appReducer,
    preloadedState,
  );
};

export default createApplicationStore;
