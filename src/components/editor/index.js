import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBlock, moveDownBlock, removeBlock, moveUpBlock, copyBlock, editBlock, deselectBlock, selectBlock,
} from 'store/actions';
import { getBlockIds, getBlockData, getSelectedId } from 'store/selectors';
import { LABELS, TYPE_COLORS, TYPE_DEFAULT_VALUES } from 'constants/types';
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
          const isCurrentBlockSelected = selectedId && selectedId === id;
          const isOtherBlockSelected = selectedId && selectedId !== id;

          const containerStyles = {
            ...(isCurrentBlockSelected ? { filter: 'blur(0)' } : {}),
            ...(isOtherBlockSelected ? { filter: 'blur(1rem)' } : {}),
            backgroundColor: TYPE_COLORS[type],
          };

          const onSelect = () => {
            dispatch(selectBlock({ id }));
          };

          const onRemove = () => {
            dispatch(removeBlock({ id }));
          };

          const onMoveDown = () => {
            dispatch(moveDownBlock({ id }));
          };

          const onMoveUp = () => {
            dispatch(moveUpBlock({ id }));
          };

          const onEdit = (updatedData) => {
            dispatch(editBlock({
              ...updatedData,
              id,
            }));
          };

          const onCopy = () => {
            dispatch(copyBlock({ id }));
          };

          return (
            <div
              key={id}
              style={containerStyles}
            >
              <sup>{LABELS[type]}</sup>
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
