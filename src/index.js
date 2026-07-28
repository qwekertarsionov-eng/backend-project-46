import { parseFile } from './parsers.js';
import buildTree from './buildTree.js';
import stylish from './formatters/stylish.js';

const genDiff = (filePath1, filePath2) => {
  // 1. Парсим файлы в обычные объекты
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);

  // 2. Строим дерево различий (AST)
  const tree = buildTree(data1, data2);

  // 3. Форматируем дерево в строку стиля 'stylish' и возвращаем результат
  return stylish(tree);
};

export default genDiff;
