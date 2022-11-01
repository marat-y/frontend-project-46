#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';

import _ from 'lodash';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0');

program
  .option('-f, --format <type>', 'output format');

program.parse();

const [objectOne, objectTwo] = program.args
  .map((fileName) => path.resolve(cwd(), fileName))
  .map((filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8')));

const getDiff = (objOne, objTwo) => {
  const changes = Object.keys(objOne).reduce((acc, key) => {
    if (!Object.hasOwn(objTwo, key)) {
      acc.push({ diff: '-', key, value: objOne[key] });
    } else if (objOne[key] === objectTwo[key]) {
      acc.push({ diff: ' ', key, value: objOne[key] });
    } else {
      acc.push({ diff: '-', key, value: objOne[key] });
      acc.push({ diff: '+', key, value: objTwo[key] });
    }

    return acc;
  }, []);

  const newKeys = _.difference(Object.keys(objTwo), Object.keys(objOne));

  newKeys.reduce((acc, key) => {
    acc.push({ diff: '+', key, value: objTwo[key] });
    return acc;
  }, changes);

  const sortedChanges = _.sortBy(changes, 'key');
  const content = sortedChanges.map((el) => ` ${el.diff} ${el.key}: ${el.value}`).join(', \n');

  return ['{', content, '}'].join('\n');
};

console.log(getDiff(objectOne, objectTwo));
