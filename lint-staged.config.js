module.exports = {
    './src/**/*.(js|jsx|ts|vue)': [
        'npx eslint --fix',
    ],
    './src/**/*.(css|scss|vue)': [
        'npx stylelint --fix',
    ],
};
