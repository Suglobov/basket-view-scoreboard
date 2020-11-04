module.exports = {
    'env': {
        'browser': true,
        'es2020': true,
        'node': true,
    },
    'extends': [
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-strongly-recommended',
        'eslint:recommended',
    ],
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module',
    },
    'plugins': [
        'vue',
    ],
    'rules': {
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'always',
                'normal': 'always',
                'component': 'always',
            },
            'svg': 'always',
            'math': 'always',
        }],
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
