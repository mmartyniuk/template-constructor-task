import { TYPES } from 'constants/types';
import Title from './blocks/title';
import Paragraph from './blocks/paragraph';
import Image from './blocks/image';
import Button from './blocks/button';

export const COMPONENT_TYPES_MAP = {
  [TYPES.TITLE]: Title,
  [TYPES.PARAGRAPH]: Paragraph,
  [TYPES.IMAGE]: Image,
  [TYPES.BUTTON]: Button,
};
