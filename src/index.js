import { parseFile } from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);

  const tree = buildTree(data1, data2);

  return format(tree, formatName);
};

export default genDiff;
