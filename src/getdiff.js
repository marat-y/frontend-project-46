import _ from 'lodash';

const getDiff = (objectOne, objectTwo) => {
  const keys = _.sortBy(_.union(_.keys(objectOne), _.keys(objectTwo)));
  const changes = keys.flatMap((key) => {
    if (!Object.hasOwn(objectTwo, key)) {
      return { key, changeStatus: 'removed', value: objectOne[key] };
    }

    if (!Object.hasOwn(objectOne, key)) {
      return { key, changeStatus: 'added', value: objectTwo[key] };
    }

    if (_.isPlainObject(objectOne[key]) && _.isPlainObject(objectTwo[key])) {
      return { key, changeStatus: 'nested', children: getDiff(objectOne[key], objectTwo[key]) };
    }

    if (_.isEqual(objectOne[key], objectTwo[key])) {
      return { key, changeStatus: 'unchanged', value: objectOne[key] };
    }

    return {
      key, changeStatus: 'changed', oldValue: objectOne[key], newValue: objectTwo[key],
    };
  });

  return changes;
};

export default getDiff;
