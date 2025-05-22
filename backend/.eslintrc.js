module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Garante integração com Prettier
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    // Boas práticas TypeScript
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn", // Evite 'any', mas não bloqueia
    "@typescript-eslint/explicit-function-return-type": "off", // Deixe o TS inferir
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",

    // Padronização de código
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "all",
        endOfLine: "auto",
        semi: true,
        tabWidth: 2,
        useTabs: false,
        bracketSpacing: true,
        arrowParens: "always",
        quoteProps: "consistent",
      },
    ],

    // Outras regras úteis
    "no-console": "warn",
    "linebreak-style": "off", // Evita conflito entre SOs
  },
};
