#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';
import genDiff from '../src/gendiff.js';

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

console.log(genDiff(objectOne, objectTwo));
