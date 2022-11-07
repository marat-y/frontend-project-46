import _ from 'lodash';

const genDiff = (objOne, objTwo) => {
  const changes = Object.keys(objOne).reduce((acc, key) => {
    if (!Object.hasOwn(objTwo, key)) {
      acc.push({ diff: '-', key, value: objOne[key] });
    } else if (objOne[key] === objTwo[key]) {
      acc.push({ diff: ' ', key, value: objOne[key] });
    } else {
      acc.push({ diff: '-', key, value: objOne[key] });
      acc.push({ diff: '+', key, value: objTwo[key] });
    }

    return acc;
  }, []);

  const newKeys = _.difference(Object.keys(objTwo), Object.keys(objOne));

  newKeys.reduce((acc, key) => {
    acc.push({ diff: '+', key, value: objTwo[key] });
    return acc;
  }, changes);

  const sortedChanges = _.sortBy(changes, 'key');
  const content = sortedChanges.map((el) => ` ${el.diff} ${el.key}: ${el.value}`).join(',\n');

  return ['{', content, '}'].join('\n');
};

export default genDiff;
