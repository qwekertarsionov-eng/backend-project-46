import { parseFile } from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  // Читаем и парсим оба файла в объекты
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);

  // На данном этапе просто выводим данные для проверки работы
  // (В следующих шагах проекта здесь будет логика сравнения)
  console.log('Data 1:', data1);
  console.log('Data 2:', data2);

  // Возвращаем строковое представление (пока заглушка)
  return 'Здесь будет готовый отчет разницы файлов';
};

export default genDiff;
