import { TYPE_COLORS, TYPE_ICONS } from 'constants/types';
import { getBlockCountByType } from 'store/selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const Tool = ({ type, onStart, onAdd }) => {
  const count = useSelector(getBlockCountByType(type));
  const Icon = TYPE_ICONS[type]();

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
    >
      <div className="icon-container" style={containerStyles}>{Icon}</div>
      <sup>
        Count:
        {' '}
        {count}
      </sup>
    </div>
  );
};

export default Tool;
