import _ from 'lodash';

const getDiff = (objectOne, objectTwo) => {
  const addChange = (changeHash, key, change) => {
    if (Object.hasOwn(changeHash, key)) {
      changeHash[key].push(change); // eslint-disable-line fp/no-mutating-methods
    } else {
      changeHash[key] = [change]; // eslint-disable-line fp/no-mutation, no-param-reassign
    }
  };

  const prepareValue = (value) => {
    if (!_.isObject(value)) return value;

    return getDiff(value, value);
  };

  const changes = Object.keys(objectOne).reduce((acc, key) => {
    if (!Object.hasOwn(objectTwo, key)) {
      addChange(acc, key, { status: 'removed', value: prepareValue(objectOne[key]) });
    } else if (_.isObject(objectOne[key]) && _.isObject(objectTwo[key])) {
      addChange(acc, key, { status: 'unchanged', value: getDiff(objectOne[key], objectTwo[key]) });
    } else if (objectOne[key] === objectTwo[key]) {
      addChange(acc, key, { status: 'unchanged', value: prepareValue(objectOne[key]) });
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

export default getDiff;
