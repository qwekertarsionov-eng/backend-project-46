#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')
  // Добавляем опцию формата
  .option('-f, --format [type]', 'output format')
  // Добавляем два обязательных аргумента (пути к файлам)
  .arguments('<filepath1> <filepath2>');

program.parse(process.argv);