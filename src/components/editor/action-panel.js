import { useState } from 'react';

function ActionPanel({
  isActive,
  onSelectBlock,
  onDeselectBlock,
  onRemove,
  onMoveUp,
  onMoveDown,
  onCopy,
  onEdit,
  defaultValue,
  isFirst,
  isLast,
}) {
  const [value, setValue] = useState(defaultValue);
  const [isEditable, setEditable] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
      }}
      onClick={(e) => {
        e.stopPropagation();

        if(!isActive && !isEditable) {
          onSelectBlock();
        } else if(isActive && !isEditable) {
          onDeselectBlock();
        }
      }}
    >
      {
        isActive ? (
          <div
            style={{
              position: 'absolute', top: '-10px', right: '0', zIndex: 3,
            }}
          >
            <button onClick={(event) => {
              event.stopPropagation();

              if(isEditable) {
                onEdit({ content: value });
              }
              setEditable((prevState) => !prevState);
            }}
            >
              {isEditable ? 'save' : 'edit'}
            </button>
            <button onClick={onRemove} disabled={isEditable}>remove</button>
            <button onClick={onMoveUp} disabled={isEditable || isFirst}>up</button>
            <button onClick={onMoveDown} disabled={isEditable || isLast}>down</button>
            <button onClick={onCopy} disabled={isEditable}>copy</button>
            <button
              onClick={(event) => {
                event.stopPropagation();

                setValue(defaultValue);
                setEditable((prevState) => !prevState);
              }}
              disabled={!isEditable}
            >
              exit
            </button>
          </div>
        ) : null
      }
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '10px',
        zIndex: 3,
        width: 'calc(100% - 30px)',
      }}
      >
        <textarea
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onClick={(event) => {
            if(isEditable) {
              event.stopPropagation();
            }
          }}
          readOnly={!isEditable}
          rows={3}
        />
      </div>
    </div>
  );
}

export default ActionPanel;
