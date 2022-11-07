import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (file1, file2) => {
  const objectOne = parse(file1);
  const objectTwo = parse(file2);

  const changes = Object.keys(objectOne).reduce((acc, key) => {
    if (!Object.hasOwn(objectTwo, key)) {
      acc.push({ diff: '-', key, value: objectOne[key] });
    } else if (objectOne[key] === objectTwo[key]) {
      acc.push({ diff: ' ', key, value: objectOne[key] });
    } else {
      acc.push({ diff: '-', key, value: objectOne[key] });
      acc.push({ diff: '+', key, value: objectTwo[key] });
    }

    return acc;
  }, []);

  const newKeys = _.difference(Object.keys(objectTwo), Object.keys(objectOne));

  newKeys.reduce((acc, key) => {
    acc.push({ diff: '+', key, value: objectTwo[key] });
    return acc;
  }, changes);

  const sortedChanges = _.sortBy(changes, 'key');
  const content = sortedChanges.map((el) => ` ${el.diff} ${el.key}: ${el.value}`).join(',\n');

  return ['{', content, '}'].join('\n');
};

export default genDiff;
