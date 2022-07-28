import { useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import { TYPE_COLORS } from 'constants/types';
import { getBlockData, getBlockIds, getSelectedId } from 'store/selectors';
import { COMPONENT_TYPES_MAP } from './constants';

const Viewer = () => {
  const blockIds = useSelector(getBlockIds);
  const data = useSelector(getBlockData);
  const activeBlockId = useSelector(getSelectedId);

  const getStyles = useCallback(({ id, type }) => ({
    ...(activeBlockId && activeBlockId === id ? { filter: 'blur(0)' } : {}),
    ...(activeBlockId && activeBlockId !== id ? { filter: 'blur(1rem)' } : {}),
    backgroundColor: TYPE_COLORS[type],
  }), [activeBlockId]);

  return (
    <div className="viewer">
      {
        blockIds.map((id) => {
          const { content, type } = data[id];
          const Component = COMPONENT_TYPES_MAP[type];

          return (
            <div
              key={id}
              style={getStyles({ id, type })}
            >
              <Component content={content} />
            </div>
          );
        })
      }
    </div>
  );
};

export default memo(Viewer);
