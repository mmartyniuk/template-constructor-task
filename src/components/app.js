import { memo } from 'react';
import Toolbar from './toolbar';
import Editor from './editor';
import Viewer from './viewer';

const App = () => (
  <div className="app">
    <Toolbar />
    <Editor />
    <Viewer />
  </div>
);

export default memo(App);
