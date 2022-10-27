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
                                      .map((filePath) =>  JSON.parse(fs.readFileSync(filePath, 'utf8')));

const getDiff = (objectOne, objectTwo) => {
  const changes = Object.keys(objectOne).reduce((acc, key) => {
    if (!Object.hasOwn(objectTwo, key)) {
      acc.push({ diff: '-', key: key, value: objectOne[key] });
    } else if (objectOne[key] === objectTwo[key]) {
      acc.push({ diff: ' ', key: key, value: objectOne[key] });
    } else {
      acc.push({ diff: '-', key: key, value: objectOne[key] });
      acc.push({ diff: '+', key: key, value: objectTwo[key] });
    }

    return acc;
  }, []);
  
  const newKeys = _.difference(Object.keys(objectTwo), Object.keys(objectOne));
  for (const key of newKeys) {
    changes.push({ diff: '+', key: key, value: objectTwo[key] });
  }

  const sortedChanges = _.sortBy(changes, 'key');
  const content = sortedChanges.map((el) => ` ${el.diff} ${el.key}: ${el.value}`).join(', \n');

  return ['{', content, '}'].join('\n');
}

console.log(getDiff(objectOne, objectTwo));
