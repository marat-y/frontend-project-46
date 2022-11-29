import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';

const getChanges = (objectOne, objectTwo) => {
  const addChange = (changeHash, key, change) => {
    if (Object.hasOwn(changeHash, key)) {
      changeHash[key].push(change);
    } else {
      changeHash[key] = [change];
    }
  };

  const prepareValue = (value) => {
    if (!_.isObject(value)) return value;

    return getChanges(value, value);
  };

  const changes = Object.keys(objectOne).reduce((acc, key) => {
    if (!Object.hasOwn(objectTwo, key)) {
      addChange(acc, key, { status: 'removed', value: prepareValue(objectOne[key]) });
    } else if (_.isObject(objectOne[key]) && _.isObject(objectTwo[key])) {
      addChange(acc, key, { status: 'no change', value: getChanges(objectOne[key], objectTwo[key]) });
    } else if (objectOne[key] === objectTwo[key]) {
      addChange(acc, key, { status: 'no change', value: prepareValue(objectOne[key]) });
    } else {
      addChange(acc, key, { status: 'removed', value: prepareValue(objectOne[key]) });
      addChange(acc, key, { status: 'added', value: prepareValue(objectTwo[key]) });
    }

    return acc;
  }, {});

  const newKeys = _.difference(Object.keys(objectTwo), Object.keys(objectOne));

  newKeys.reduce((acc, key) => {
    addChange(acc, key, { status: 'added', value: prepareValue(objectTwo[key]) });

    return acc;
  }, changes);

  return changes;
};

const genDiff = (file1, file2, formatName = 'stylish') => {
  const objectOne = parse(file1);
  const objectTwo = parse(file2);

  const changes = getChanges(objectOne, objectTwo);

  return format(formatName, changes);
};

export default genDiff;
