import path from 'path';
import fs from 'fs';
import * as yaml from 'js-yaml'; // Импортируем всё как объект yaml

export const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const ext = path.extname(filepath).toLowerCase();

  if (ext === '.json') {
    return JSON.parse(content);
  }
  
  if (ext === '.yaml' || ext === '.yml') {
    // Метод load теперь вызывается точно так же, но без ошибок импорта
    return yaml.load(content);
  }

  throw new Error(`Unknown format: ${ext}`);
};