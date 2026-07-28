import _ from 'lodash';

const isObject = (value) => _.isPlainObject(value);

// Функция для формирования отступов
const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const bracketIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount);

// Вспомогательная функция для превращения обычных JS-объектов в строковый вид
const stringify = (value, depth) => {
  if (!isObject(value)) {
    return String(value);
  }

  const keys = _.keys(value);
  const lines = keys.map((key) => {
    return `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`;
  });

  return `{\n${lines.join('\n')}\n${bracketIndent(depth)}}`;
};

// Основная рекурсивная функция обхода дерева AST
const stylish = (tree) => {
  const iter = (node, depth) => {
    return node.flatMap((item) => {
      switch (item.type) {
        case 'nested':
          return `${indent(depth)}  ${item.key}: {\n${iter(item.children, depth + 1).join('\n')}\n${bracketIndent(depth)}}`;
        case 'added':
          return `${indent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'deleted':
          return `${indent(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'unchanged':
          return `${indent(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return [
            `${indent(depth)}- ${item.key}: ${stringify(item.oldValue, depth)}`,
            `${indent(depth)}+ ${item.key}: ${stringify(item.newValue, depth)}`,
          ];
        default:
          throw new Error(`Unknown type: ${item.type}`);
      }
    });
  };

  return `{\n${iter(tree, 1).join('\n')}\n}`;
};

export default stylish;