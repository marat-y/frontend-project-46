import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('stylish JSON', () => {
  const expectedResult = readFile('stylishResult.txt').trim();
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toEqual(expectedResult);
});

test('stylish YML', () => {
  const expectedResult = readFile('stylishResult.txt').trim();
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish')).toEqual(expectedResult);
});

test('stylish as default', () => {
  const expectedResult = readFile('stylishResult.txt').trim();
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(expectedResult);
});

test('plain JSON', () => {
  const expectedResult = readFile('plainResult.txt').trim();
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(expectedResult);
});

test('plain YML', () => {
  const expectedResult = readFile('plainResult.txt').trim();
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain')).toEqual(expectedResult);
});

test('json JSON', () => {
  const expectedResult = readFile('jsonResult.txt').trim();
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(expectedResult);
});

test('json YML', () => {
  const expectedResult = readFile('jsonResult.txt').trim();
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json')).toEqual(expectedResult);
});
