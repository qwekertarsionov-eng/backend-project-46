import _ from 'lodash';
import { parseFile } from './parsers.js';

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));

  return unionKeys.map((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);

    switch (true) {
      case (!hasKey1):
        return { key, type: 'added', value: data2[key] };
      case (!hasKey2):
        return { key, type: 'deleted', value: data1[key] };
      case (data1[key] !== data2[key]):
        return { key, type: 'changed', oldValue: data1[key], newValue: data2[key] };
      default:
        return { key, type: 'unchanged', value: data1[key] };
    }
  });
};

const formatDiff = (diff) => {
  const lines = diff.flatMap(({ key, type, value, oldValue, newValue }) => {
    switch (type) {
      case 'added':
        return `  + ${key}: ${value}`;
      case 'deleted':
        return `  - ${key}: ${value}`;
      case 'changed':
        return [
          `  - ${key}: ${oldValue}`,
          `  + ${key}: ${newValue}`
        ];
      case 'unchanged':
        return `    ${key}: ${value}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diff = buildDiff(data1, data2);
  return formatDiff(diff);
};

export default genDiff;
