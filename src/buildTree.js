import _ from 'lodash';

const isObject = (value) => _.isPlainObject(value);

const buildTree = (data1, data2) => {
  // Получаем все уникальные ключи из обоих объектов и сортируем их
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  return keys.map((key) => {
    // 1. Ключа нет в первом объекте -> он добавлен
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    // 2. Ключа нет во втором объекте -> он удален
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    // 3. Оба значения являются объектами -> рекурсивно идем вглубь
    if (isObject(data1[key]) && isObject(data2[key])) {
      return { key, type: 'nested', children: buildTree(data1[key], data2[key]) };
    }
// 4. Значения одинаковые -> без изменений
    if (data1[key] === data2[key]) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    // 5. Значения разные -> изменено
    return {
      key,
      type: 'changed',
      oldValue: data1[key],
      newValue: data2[key],
    };
  });
};

export default buildTree;