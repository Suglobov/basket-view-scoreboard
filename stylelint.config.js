module.exports = {
    plugins: [
        'stylelint-scss',
        'stylelint-order',
    ],
    extends: [
        'stylelint-config-standard',
        'stylelint-config-idiomatic-order',
        'stylelint-config-prettier',
    ],
    rules: {
        'scss/at-import-partial-extension-blacklist': [''],
        'scss/dollar-variable-pattern': /.*/,
        indentation: 4,
        'max-empty-lines': 1,
        'selector-class-pattern': /.*/,
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['each'],
            },
        ],
    },
};
