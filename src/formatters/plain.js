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
  const content = [];
  Object.keys(changes).sort().forEach((key) => {
    const propertyChanges = changes[key];
    if (isAdded(propertyChanges)) {
      content.push(`Property '${getPropertyPath(key, parents)}' was added with value: ${getPreparedValue(changes[key][0].value)}`);
    } else if (isRemoved(propertyChanges)) {
      content.push(`Property '${getPropertyPath(key, parents)}' was removed`);
    } else if (isUpdated(propertyChanges)) {
      content.push(`Property '${getPropertyPath(key, parents)}' was updated. From ${getUpdatedFrom(propertyChanges)} to ${getUpdatedTo(propertyChanges)}`);
    } else {
      if (!_.isObject(propertyChanges[0].value)) return;

      content.push(...getLines(propertyChanges[0].value, [...parents, key]));
    }
  });

  return content;
};

const format = (changes) => getLines(changes).join('\n');

export default format;
