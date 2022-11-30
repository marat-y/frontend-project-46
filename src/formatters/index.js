import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylishFormatter;
    case 'plain':
      return plainFormatter;
    case 'json':
      return jsonFormatter;
    default:
      throw new Error(`${format} formatter is not supported`);
  }
};

const format = (formatName, changes) => {
  const formatter = getFormatter(formatName);

  return formatter(changes);
};

export default format;
