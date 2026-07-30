#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filePath1> <filePath2>')
  .option('-f, --format <type>', 'output format', 'stylish') // Добавили опцию с дефолтным значением
  .action((filePath1, filePath2, options) => {
    console.log(genDiff(filePath1, filePath2, options.format));
  });

program.parse(process.argv);
