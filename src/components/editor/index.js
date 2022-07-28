import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBlock,
  moveDownBlock,
  removeBlock,
  moveUpBlock,
  copyBlock,
  editBlock,
  deselectBlock,
  selectBlock,
} from 'store/actions';
import { getBlockIds, getBlockData, getSelectedId } from 'store/selectors';
import {
  TYPE_COLORS,
  TYPE_DEFAULT_VALUES,
  TYPE_ICONS,
} from 'constants/types';
import { BLOCK_TYPE_KEY } from 'constants/config';
import ActionPanel from './action-panel';

const Editor = () => {
  const dispatch = useDispatch();
  const blockIds = useSelector(getBlockIds);
  const data = useSelector(getBlockData);
  const [isDropReady, setDropReady] = useState(false);
  const selectedId = useSelector(getSelectedId);

  const onDeselect = () => {
    dispatch(deselectBlock());
  };

  const allowDrop = (event) => {
    event.preventDefault();

    if(!isDropReady) {
      setDropReady(true);
    }
  };

  const restrictDrop = (event) => {
    event.preventDefault();

    if(isDropReady) {
      setDropReady(false);
    }
  };

  const onDrop = (event) => {
    const type = event.dataTransfer.getData(BLOCK_TYPE_KEY);

    if (isDropReady) {
      event.preventDefault();

      dispatch(addBlock({ type, content: TYPE_DEFAULT_VALUES[type] }));

      setDropReady(false);
    }
  };

  const onRemove = () => {
    dispatch(removeBlock({ id: selectedId }));
  };

  const onMoveDown = () => {
    dispatch(moveDownBlock({ id: selectedId }));
  };

  const onMoveUp = () => {
    dispatch(moveUpBlock({ id: selectedId }));
  };

  const onEdit = (updatedData) => {
    dispatch(editBlock({
      ...updatedData,
      id: selectedId,
    }));
  };

  const onCopy = () => {
    dispatch(copyBlock({ id: selectedId }));
  };

  return (
    <div
      className="editor"
      onDrop={onDrop}
      onDragOver={allowDrop}
      onDragLeave={restrictDrop}
      style={{ opacity: !isDropReady ? 1 : 0.5 }}
    >
      {
        blockIds.map((id, index) => {
          const { content, type } = data[id];
          const isOtherBlockSelected = selectedId && selectedId !== id;
          const Icon = TYPE_ICONS[type]();

          const containerStyles = {
            ...(isOtherBlockSelected ? { filter: 'blur(1rem)', pointerEvents: 'none' } : {}),
            backgroundColor: TYPE_COLORS[type],
          };

          const onSelect = () => {
            dispatch(selectBlock({ id }));
          };

          return (
            <div
              key={id}
              style={containerStyles}
            >
              <div className="icon-container">
                {Icon}
              </div>
              <ActionPanel
                isFirst={index === 0}
                isLast={index === blockIds.length - 1}
                isActive={id === selectedId}
                defaultValue={content}
                onSelect={onSelect}
                onDeselect={onDeselect}
                onRemove={onRemove}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                onCopy={onCopy}
                onEdit={onEdit}
              />
            </div>
          );
        })
      }
    </div>
  );
};

export default memo(Editor);
