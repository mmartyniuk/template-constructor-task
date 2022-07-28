import Button from 'library/icons/button';
import Title from 'library/icons/title';
import Paragraph from 'library/icons/paragraph';
import Image from 'library/icons/image';

export const TYPES = {
  IMAGE: 'image',
  TITLE: 'title',
  PARAGRAPH: 'paragraph',
  BUTTON: 'button',
};

export const LABELS = {
  [TYPES.TITLE]: 'Title',
  [TYPES.PARAGRAPH]: 'Paragraph',
  [TYPES.IMAGE]: 'Image',
  [TYPES.BUTTON]: 'Button',
};

export const TYPE_DEFAULT_VALUES = {
  [TYPES.TITLE]: 'Page title',
  [TYPES.PARAGRAPH]: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  [TYPES.IMAGE]: 'https://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg',
  [TYPES.BUTTON]: 'Press',
};

export const TYPE_COLORS = {
  [TYPES.TITLE]: 'cornflowerblue',
  [TYPES.PARAGRAPH]: 'sandybrown',
  [TYPES.IMAGE]: 'cornsilk',
  [TYPES.BUTTON]: 'darkseagreen',
};

export const TYPE_ICONS = {
  [TYPES.TITLE]: Title,
  [TYPES.PARAGRAPH]: Paragraph,
  [TYPES.IMAGE]: Image,
  [TYPES.BUTTON]: Button,
};
