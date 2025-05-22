import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser"; // Import the parser
import sonarjs from "eslint-plugin-sonarjs";
import prettier from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "@typescript-eslint": typescript,
            sonarjs: sonarjs,
            prettier: prettier,
        },
        languageOptions: {
            parser: typescriptParser, // Use the imported parser here
            ecmaVersion: 2020,
            sourceType: "module",
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-unused-vars": ["warn", {argsIgnorePattern: "^_"}],
            "no-unused-vars": ["warn", {argsIgnorePattern: "^_"}],
            // "@typescript-eslint/no-non-null-assertion": "error",
            eqeqeq: "error",
            // "no-console": "warn",
            "no-constant-condition": "error",
            curly: "error",
            "no-eval": "error",
            "no-implied-eval": "error",
            "no-redeclare": "error",
            "no-tabs": ["error", {allowIndentationTabs: true}],
            // "indent": ["error", 4, {SwitchCase: 1}],
            quotes: ["error", "double"],
            semi: ["error", "always"],
            "callback-return": "warn",
            "handle-callback-err": "error",
            "no-path-concat": "error",
            // "no-secrets/no-secrets": "error",
            "prettier/prettier": [
                "error",
                {
                    printWidth: 90,
                    tabWidth: 4,
                    useTabs: false,
                    trailingComma: "all",
                    semi: true,
                    bracketSpacing: false,
                },
            ],
        },
        ignores: [
            "dist/",
            "node_modules/",
            "coverage/",
            "build/",
            "**/ui/*",
            "src/lib/supabase/**",
            ".next/**",
        ],
    },
];
