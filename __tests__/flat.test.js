import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('flat', () => {
  const json1 = JSON.parse(readFile('flatFile1.json'));
  const json2 = JSON.parse(readFile('flatFile2.json'));
  const expectedResult = readFile('flatResult.txt').trim();

  expect(genDiff(json1, json2)).toEqual(expectedResult);
});
