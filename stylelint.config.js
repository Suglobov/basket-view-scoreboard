module.exports = {
    plugins: [
        'stylelint-order',
        'stylelint-scss',
    ],
    extends: 'stylelint-config-sass-guidelines',
    rules: {
        'indentation': 4,
        'selector-class-pattern': /.*/,
        'scss/at-import-partial-extension-blacklist': [''],
        'scss/dollar-variable-pattern': /.*/,
    },
};
