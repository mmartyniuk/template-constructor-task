import { LABELS, TYPE_COLORS } from 'constants/types';
import { getBlockCountByType } from 'store/selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const Tool = ({ type, onStart, onAdd }) => {
  const count = useSelector(getBlockCountByType(type));

  const handleClick = (event) => {
    event.preventDefault();

    onAdd(type);
  };

  const containerStyles = useMemo(() => ({
    backgroundColor: TYPE_COLORS[type],
  }), [type]);

  return (
    <div
      draggable="true"
      id={type}
      onDragStart={onStart}
      onClick={handleClick}
      style={containerStyles}
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
};

export default Tool;
