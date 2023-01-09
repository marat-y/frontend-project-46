import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each(['json', 'yml'])('gendiff %s', (objectFormat) => {
  ['plain', 'json', 'stylish'].forEach((outputFormat) => {
    const expectedResult = readFile(`${outputFormat}Result.txt`).trim();
    expect(genDiff(`__fixtures__/file1.${objectFormat}`, `__fixtures__/file2.${objectFormat}`, outputFormat)).toEqual(expectedResult);
  });
});

test('stylish as default', () => {
  const expectedResult = readFile('stylishResult.txt').trim();
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(expectedResult);
});
