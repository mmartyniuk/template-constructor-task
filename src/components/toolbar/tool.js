import { LABELS, TYPE_COLORS } from 'constants/types';
import { getBlockCountByType } from 'store/selectors';
import { useSelector } from 'react-redux';

function Tool({ type, onStart, onAddBlock }) {
  const count = useSelector(getBlockCountByType(type));

  const handleClick = (event) => {
    event.preventDefault();

    onAddBlock(type);
  };

  return (
    <div
      draggable="true"
      id={type}
      onDragStart={onStart}
      onClick={handleClick}
      style={{
        backgroundColor: TYPE_COLORS[type],
      }}
    >
      <pre>
        Add
        {' '}
        {LABELS[type]}
      </pre>
      <br />
      <sup>
        Count:
        {' '}
        {count}
      </sup>
    </div>
  );
}

export default Tool;
