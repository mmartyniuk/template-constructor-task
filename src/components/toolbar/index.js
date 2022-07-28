import { memo } from 'react';
import { TYPE_DEFAULT_VALUES, TYPES } from 'constants/types';
import { addBlock } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedId } from 'store/selectors';
import { BLOCK_TYPE_KEY } from 'constants/config';
import Tool from './tool';

const TYPES_LIST = Object.values(TYPES);
const DISABLED_ELEMENT_STYLES = { filter: 'grayscale(1)', cursor: 'not-allowed', opacity: 0.3 };
const ELEMENT_STYLES = { cursor: 'pointer' };

const onDragStart = (event) => {
  event.dataTransfer.setData(BLOCK_TYPE_KEY, event.target.id);
};

const Toolbar = () => {
  const selectedId = useSelector(getSelectedId);
  const dispatch = useDispatch();

  const onAddBlock = (type) => {
    dispatch(addBlock({ type, content: TYPE_DEFAULT_VALUES[type] }));
  };

  return (
    <div
      className="toolbar"
      style={{
        ...(selectedId ? DISABLED_ELEMENT_STYLES : {}),
        ...ELEMENT_STYLES,
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
};

export default memo(Toolbar);
