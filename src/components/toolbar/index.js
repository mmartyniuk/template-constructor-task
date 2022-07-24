import { TYPE_DEFAULT_VALUES, TYPES } from 'constants/types';
import { addBlock } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedId } from 'store/selectors';
import Tool from './tool';

const TYPES_LIST = Object.values(TYPES);

function Toolbar() {
  const selectedId = useSelector(getSelectedId);
  const dispatch = useDispatch();

  const onDragStart = (event) => {
    event.dataTransfer.setData('blockType', event.target.id);
  };

  const onAddBlock = (type) => {
    dispatch(addBlock({ type, content: TYPE_DEFAULT_VALUES[type] }));
  };

  return (
    <div
      className="toolbar"
      style={{
        ...(selectedId ? { filter: 'grayscale(1)', cursor: 'not-allowed', opacity: 0.3 } : { cursor: 'pointer' }),
      }}
    >
      {TYPES_LIST.map((type) => (
        <Tool
          key={type}
          type={type}
          onStart={!selectedId ? onDragStart : undefined}
          onAddBlock={!selectedId ? onAddBlock : undefined}
        />
      ))}
    </div>
  );
}

export default Toolbar;
