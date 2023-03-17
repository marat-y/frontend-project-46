import _ from 'lodash';

const getPropertyPath = (property, parents) => [...parents, property].join('.');

const getPreparedValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const getLines = (changes, parents = []) => {
  const result = changes.flatMap((change) => {
    const changeType = change.changeStatus;
    switch (changeType) {
      case 'nested':
        return getLines(change.children, [...parents, change.key]);
      case 'added':
        return `Property '${getPropertyPath(change.key, parents)}' was added with value: ${getPreparedValue(change.value)}`;
      case 'removed':
        return `Property '${getPropertyPath(change.key, parents)}' was removed`;
      case 'changed':
        return `Property '${getPropertyPath(change.key, parents)}' was updated. From ${getPreparedValue(change.oldValue)} to ${getPreparedValue(change.newValue)}`;
      default:
        return null;
    }
  });
  return _.filter(result, (el) => !_.isNull(el));
};

const format = (changes) => getLines(changes).join('\n');

export default format;
