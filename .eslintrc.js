module.exports = {
    extends: [
        'eslint:recommended',
        'standard',
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-strongly-recommended',
    ],
    plugins: [
        'vue',
        'jest',
    ],
    env: {
        browser: true,
        es2020: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    rules: {
        'vue/html-indent': [
            'error',
            4,
        ],
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'always-multiline',
        }],
        'space-before-function-paren': ['error', 'never'],
        'no-multiple-empty-lines': ['error', { max: 2 }],
    },
};
