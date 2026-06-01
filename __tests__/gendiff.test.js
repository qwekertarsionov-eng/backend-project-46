import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals'; // Импортируем test и expect напрямую для линтера
import genDiff from '../src/index.js';

// Имитация __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для получения абсолютного пути к фикстурам
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename);

// Читаем ожидаемый результат
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff flat JSON comparison', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const expected = readFile('expected_result.txt').trim();

  expect(genDiff(path1, path2).trim()).toEqual(expected);
});
