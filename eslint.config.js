import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["node_modules/**"],
    },

    {
        files: ["server.js", "src/**/*.js"],

        languageOptions: {
            globals: {
                ...globals.node,
                fetch: "readonly",
            },
        },

        rules: {
            ...js.configs.recommended.rules,
        },
    },

    {
        files: ["public/**/*.js"],

        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },

        rules: {
            ...js.configs.recommended.rules,
        },
    },
];
