import js from "@eslint/js";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";

export default [
  // Глобальные игноры
  {
    ignores: [
      "**/node_modules/**", 
      "**/dist/**", 
      "**/build/**", 
      "eslint.config.js"
    ],
  },

  js.configs.recommended,
  
  // ИСПРАВЛЕНО: Вместо "recommended-flat" теперь используется просто .recommended
  stylistic.configs.recommended,
  
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.ts"], 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",

      // Ваши кастомные правила стилей (если нужны)
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "single"],
      "@stylistic/semi": ["error", "always"],
    },
  },
];