import { createStore } from 'redux';
import { appReducer } from './reducer';

const createApplicationStore = () => {
  let preloadedState;

  try {
    const storedData = localStorage.getItem('blocks-test-task');

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
