import _ from 'lodash';

const isAdded = (changes) => changes.length === 1 && changes[0].status === 'added';

const isRemoved = (changes) => changes.length === 1 && changes[0].status === 'removed';

const getPropertyPath = (property, parents) => [...parents, property].join('.');

const getPreparedValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const formatter = (changes, parents = []) => {
  const content = [];
  Object.keys(changes).sort().forEach((key) => {
    if (isAdded(changes[key])) {
      content.push(`Property ${getPropertyPath(key, parents)} was added with value: ${getPreparedValue(changes[key].value)}`);
    } else if (isRemoved(changes[key])) {
      content.push(`Property ${getPropertyPath(key, parents)} was removed`);
    } else if (isUpdated(changes[key])) {
      content.push(`Property ${getPropertyPath(key, parents)} updated. From '' to 'so much'`);
    }
  });

  return content.join('\n');
};

export default formatter;
