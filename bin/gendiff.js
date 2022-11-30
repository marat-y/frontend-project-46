#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0');

program
  .option('-f, --format <format>', 'output format', 'stylish');

program.parse();

const [fileOne, fileTwo] = program.args;

console.log(genDiff(fileOne, fileTwo, program.opts().format));
