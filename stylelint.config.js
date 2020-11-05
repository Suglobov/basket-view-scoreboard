module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recommended',
        'stylelint-config-sass-guidelines',
        'stylelint-config-idiomatic-order',
        'stylelint-config-prettier',
    ],
    plugins: [
        'stylelint-scss',
        'stylelint-order',
    ],
    rules: {
        'order/properties-alphabetical-order': [
            false,
            { 'disableFix': true },
        ],
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
