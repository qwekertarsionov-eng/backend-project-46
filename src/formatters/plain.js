import _ from 'lodash';

const isObject = value => _.isPlainObject(value);

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const iter = (nodes, currentPath) => {
    const lines = nodes
      .flatMap((node) => {
        const propertyPath = currentPath ? `${currentPath}.${node.key}` : node.key;

        switch (node.type) {
          case 'nested':
            return iter(node.children, propertyPath);
          case 'added':
            return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`;
          case 'deleted':
            return `Property '${propertyPath}' was removed`;
          case 'changed':
            return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
          case 'unchanged':
            return []; // Игнорируем свойства без изменений
          default:
            throw new Error(`Unknown type: ${node.type}`);
        }
      });

    return lines.join('\n');
  };

  return iter(tree, '');
};

export default plain;
