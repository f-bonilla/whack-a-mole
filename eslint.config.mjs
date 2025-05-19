import pkg from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import babelParser from "@babel/eslint-parser";
import globals from "globals";

const { configs: recommended } = pkg;

export default [
  recommended.recommended,
  {
    ignores: ["dist/**/*"], // Ignora todos los archivos dentro de la carpeta dist/
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false, // Evita que Babel busque un archivo de configuración
      },
      globals: {
        ...globals.es2021,
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "init-declarations": ["error", "always"],
      indent: "off",
      "spaced-comment": ["error", "always", { markers: ["/"] }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "no-useless-catch": "off",
      "no-unused-vars": "error",
      "no-console": "off",
      "id-denylist": ["error", "err", "e"],
      "no-restricted-syntax": [
        "error",
        {
          selector: "Identifier[name='e']",
          message: "Use ‘event’ instead of ‘e’.",
        },
        {
          selector: "Identifier[name='err']",
          message: "Use ‘error’ instead of ‘err’.",
        },
      ],
    },
  },
  {
    files: ["*.tpl"],
    rules: {
      "object-curly-spacing": [2, "never"],
    },
  },
];
