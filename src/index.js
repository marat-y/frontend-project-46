import getDiff from './getdiff.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const objectOne = parse(file1);
  const objectTwo = parse(file2);

  const changes = getDiff(objectOne, objectTwo);

  return format(formatName, changes);
};

export default genDiff;
