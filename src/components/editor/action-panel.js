import { useState, useCallback } from 'react';

const ACTION_CONTAINER_STYLES = {
  position: 'absolute',
  top: '-40px',
  right: 0,
  zIndex: 3,
};

const INPUT_CONTAINER_STYLES = {
  position: 'absolute',
  bottom: '30px',
  left: '10px',
  zIndex: 3,
  width: 'calc(100% - 30px)',
};

const CONTAINER_STYLES = {
  position: 'relative',
  height: '100%',
};

const ActionPanel = ({
  isActive,
  onSelect,
  onDeselect,
  onRemove,
  onMoveUp,
  onMoveDown,
  onCopy,
  onEdit,
  defaultValue,
  isFirst,
  isLast,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isEditable, setEditable] = useState(false);

  const handleExit = useCallback((event) => {
    event.stopPropagation();

    setValue(defaultValue);
    setEditable((prevState) => !prevState);
  }, [defaultValue]);

  const handleInputClick = useCallback((event) => {
    if (isEditable) {
      event.stopPropagation();
    }
  }, [isEditable]);

  // toggle edit state on block click (due to requirements)
  const handleSelect = (event) => {
    event.stopPropagation();

    if(!isEditable) {
      if(!isActive) {
        onSelect();
      } else {
        onDeselect();
      }
    }
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const toggleEditable = (event) => {
    event.stopPropagation();

    if(isEditable) {
      onEdit({ content: value });
    }

    setEditable((prevState) => !prevState);
  };

  const getActionButtons = () => {
    if(!isActive) {
      return null;
    }

    return (
      <div style={ACTION_CONTAINER_STYLES} title="">
        <button onClick={toggleEditable}>
          {isEditable ? 'Save' : 'Edit content'}
        </button>
        {
          !isEditable ? (
            <>
              <button onClick={onRemove} disabled={isEditable}>Remove</button>
              <button onClick={onMoveUp} disabled={isEditable || isFirst}>Move up</button>
              <button onClick={onMoveDown} disabled={isEditable || isLast}>Move down</button>
              <button onClick={onCopy} disabled={isEditable}>Clone</button>
            </>
          ) : (
            <button onClick={handleExit}>Exit</button>
          )
        }
      </div>
    );
  };

  const getTitle = () => {
    if(isEditable) {
      return '';
    }

    return (isActive) ? 'Click to deselect' : 'Click to select';
  };

  return (
    <div
      style={CONTAINER_STYLES}
      onClick={handleSelect}
      title={getTitle()}
    >
      {getActionButtons(isEditable)}
      <div style={INPUT_CONTAINER_STYLES}>
        <textarea
          rows={3}
          value={value}
          title=""
          onChange={handleInputChange}
          onClick={handleInputClick}
          readOnly={!isEditable}
        />
      </div>
    </div>
  );
};

export default ActionPanel;
