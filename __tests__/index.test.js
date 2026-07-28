import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

// Функция для получения абсолютного пути к фикстурам
const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);

// Читаем ожидаемый результат один раз для всех тестов
const expected = fs.readFileSync(getFixturePath('expected_flat.txt'), 'utf-8');

test('genDiff JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('genDiff YAML', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml'); // Изменили .yml на .yaml (или наоборот, если у вас .yml)
  expect(genDiff(file1, file2)).toEqual(expected);
});

const expectedNested = fs.readFileSync(getFixturePath('expected_nested.txt'), 'utf-8');

test('genDiff nested JSON', () => {
  const file1 = getFixturePath('nested1.json');
  const file2 = getFixturePath('nested2.json');
  expect(genDiff(file1, file2)).toEqual(expectedNested);
});

test('genDiff nested YAML', () => {
  const file1 = getFixturePath('nested1.yaml');
  const file2 = getFixturePath('nested2.yaml');
  expect(genDiff(file1, file2)).toEqual(expectedNested);
});