import _ from 'lodash';

const diffIcon = (status) => {
  switch (status) {
    case 'unchanged':
      return ' ';
    case 'added':
      return '+';
    case 'removed':
      return '-';
    default:
      throw new Error(`"${status}" change status is not supported`);
  }
};

const indent = '  ';

const format = (changes, depth = 0) => {
  const content = _.sortBy(Object.keys(changes)).reduce((acc, key) => {
    const keyContent = changes[key].reduce((keyAcc, change) => {
      const value = _.isObject(change.value) ? format(change.value, depth + 1) : change.value;
      const contentLineIndent = indent.repeat(1 + (depth * 2));
      const diff = `${contentLineIndent}${diffIcon(change.status)} ${key}: ${value}`;

      return [...keyAcc, diff];
    }, []);

    return [...acc, ...keyContent];
  }, []);

  return ['{', content.join('\n'), `${indent.repeat(depth * 2)}}`].join('\n');
};

export default format;
