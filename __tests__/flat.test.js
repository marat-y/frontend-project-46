import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('flat JSON', () => {
  const expectedResult = readFile('flatResult.txt').trim();
  expect(genDiff('__fixtures__/flatFile1.json', '__fixtures__/flatFile2.json')).toEqual(expectedResult);
});

test('flat YML', () => {
  const expectedResult = readFile('flatResult.txt').trim();
  expect(genDiff('__fixtures__/flatFile1.yml', '__fixtures__/flatFile2.yml')).toEqual(expectedResult);
});
