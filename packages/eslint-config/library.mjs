import pluginJs from "@eslint/js";

import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import pluginPromise from "eslint-plugin-promise";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended, // ? https://github.com/eslint/eslint
  importPlugin.flatConfigs.recommended, // ? https://github.com/import-js/eslint-plugin-import
  ...tseslint.configs.recommended, // ? https://github.com/typescript-eslint/typescript-eslint
  pluginPromise.configs["flat/recommended"], // ? https://github.com/eslint-community/eslint-plugin-promise
  eslintConfigPrettier, // ? https://github.com/prettier/eslint-config-prettier
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "import/no-unresolved": "off",
      "import/no-named-as-default": "off",
      "newline-before-return": "off",
    },
  },
];
