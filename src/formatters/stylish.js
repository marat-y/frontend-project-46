import _ from 'lodash';

const indentSymbol = ' ';

const lineIndent = (depth) => {
  const repeatTimes = depth * 4 - 2;
  return indentSymbol.repeat(Math.sign(repeatTimes) === -1 ? 0 : repeatTimes);
};

const stringify = (depth, icon, key, value) => {
  // eslint-disable-next-line fp/no-let
  let newValue;
  if (_.isPlainObject(value)) {
    const content = Object.keys(value).map((valueKey) => stringify(depth + 1, ' ', valueKey, value[valueKey]));
    // eslint-disable-next-line fp/no-mutation
    newValue = ['{', content.join('\n'), `${indentSymbol.repeat(depth * 4)}}`].join('\n');
  } else {
    // eslint-disable-next-line fp/no-mutation
    newValue = value;
  }

  return `${lineIndent(depth)}${icon} ${key}: ${newValue}`;
};

const format = (changes, depth = 1) => {
  const sortedChanges = _.sortBy(changes, 'key');
  const content = sortedChanges.flatMap((change) => {
    const status = change.changeStatus;
    switch (status) {
      case 'unchanged':
        return stringify(depth, ' ', change.key, change.value);
      case 'added':
        return stringify(depth, '+', change.key, change.value);
      case 'removed':
        return stringify(depth, '-', change.key, change.value);
      case 'changed':
        return [stringify(depth, '-', change.key, change.oldValue),
          stringify(depth, '+', change.key, change.newValue)];
      case 'nested':
        return stringify(depth, ' ', change.key, format(change.children, depth + 1));
      default:
        throw new Error(`"${status}" change status is not supported`);
    }
  });

  return ['{', content.join('\n'), `${indentSymbol.repeat((depth - 1) * 4)}}`].join('\n');
};

export default format;
