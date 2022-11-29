import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('JSON', () => {
  const expectedResult = readFile('result.txt').trim();
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expectedResult);
});

test('YML', () => {
  const expectedResult = readFile('result.txt').trim();
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(expectedResult);
});
