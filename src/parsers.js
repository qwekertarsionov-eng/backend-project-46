import fs from 'fs';
import path from 'path';

export const parseFile = (filepath) => {
  // Получаем абсолютный путь с учетом текущей рабочей директории
  const absolutePath = path.resolve(process.cwd(), filepath);

  // Читаем файл синхронно
  const content = fs.readFileSync(absolutePath, 'utf-8');

  // Получаем расширение файла (например, '.json')
  const ext = path.extname(absolutePath);

  // Парсим в зависимости от расширения
  if (ext === '.json') {
    return JSON.parse(content);
  }

  throw new Error(`Unknown format: ${ext}`);
};
