import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylishFormatter;
    case 'plain':
      return plainFormatter;
    default:
      throw new Error(`${format} formatter is not supported`);
  }
};

const format = (formatName, changes) => {
  const formatter = getFormatter(formatName);

  return formatter(changes);
};

export default format;
