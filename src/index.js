import _ from 'lodash';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';
import getDiff from './getdiff.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const getFileContent = (file) => {
  const filePath = path.resolve(cwd(), file);
  return fs.readFileSync(filePath, 'utf8');
};

const getFileExtension = (file) => _.last(file.split('.'));

const genDiff = (file1, file2, formatName = 'stylish') => {
  const objectOne = parse(getFileContent(file1), getFileExtension(file1));
  const objectTwo = parse(getFileContent(file2), getFileExtension(file2));

  const changes = getDiff(objectOne, objectTwo);

  return format(formatName, changes);
};

export default genDiff;
