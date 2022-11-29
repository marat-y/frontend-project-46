import _ from 'lodash';

const stylishFormatter = (changes, depth = 0) => {
  const diffIcon = (status) => {
    switch (status) {
      case 'no change':
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

  const content = [];
  // for (const key of Object.keys(changes).sort()) {
  Object.keys(changes).sort().forEach((key) => {
    changes[key].forEach((change) => {
      const value = _.isObject(change.value) ? stylishFormatter(change.value, depth + 1) : change.value;
      const contentLineIndent = indent.repeat(1 + (depth * 2));
      content.push(`${contentLineIndent}${diffIcon(change.status)} ${key}: ${value}`);
    });
  });

  return ['{', content.join('\n'), `${indent.repeat(depth * 2)}}`].join('\n');
};

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylishFormatter;
    default:
      throw new Error(`${format} formatter is not supported`);
  }
};

const format = (formatName, changes) => {
  const formatter = getFormatter(formatName);

  return formatter(changes);
};

export default format;
