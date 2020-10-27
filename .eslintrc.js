module.exports = {
    'env': {
        'browser': true,
        'es2020': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        // 'plugin:vue/essential',
        'plugin:vue/vue3-recommended',
    ],
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module',
    },
    'plugins': [
        'vue',
    ],
    'rules': {
        'vue/html-indent': [
            'error',
            4,
        ],
        'indent': [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'always-multiline',
        }],
    },
};
