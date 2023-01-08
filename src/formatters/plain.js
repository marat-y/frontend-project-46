import _ from 'lodash';

const isAdded = (changes) => changes.length === 1 && changes[0].status === 'added';

const isRemoved = (changes) => changes.length === 1 && changes[0].status === 'removed';

const getPropertyPath = (property, parents) => [...parents, property].join('.');

const getPreparedValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const isUpdated = (changes) => changes.length === 2;

const getUpdatedFrom = (changes) => {
  const updatedFromValue = changes.filter((change) => isRemoved([change]))[0].value;
  return getPreparedValue(updatedFromValue);
};

const getUpdatedTo = (changes) => {
  const updatedToValue = changes.filter((change) => isAdded([change]))[0].value;
  return getPreparedValue(updatedToValue);
};

const getLines = (changes, parents = []) => {
  const content = _.sortBy(Object.keys(changes)).reduce((acc, key) => {
    const propertyChanges = changes[key];
    if (isAdded(propertyChanges)) {
      const change = `Property '${getPropertyPath(key, parents)}' was added with value: ${getPreparedValue(changes[key][0].value)}`;

      return [...acc, change];
    }

    if (isRemoved(propertyChanges)) {
      const change = `Property '${getPropertyPath(key, parents)}' was removed`;

      return [...acc, change];
    }

    if (isUpdated(propertyChanges)) {
      const change = `Property '${getPropertyPath(key, parents)}' was updated. From ${getUpdatedFrom(propertyChanges)} to ${getUpdatedTo(propertyChanges)}`;

      return [...acc, change];
    }

    if (!_.isObject(propertyChanges[0].value)) return acc;

    return [...acc, ...getLines(propertyChanges[0].value, [...parents, key])];
  }, []);

  return content;
};

const format = (changes) => getLines(changes).join('\n');

export default format;
