module.exports = {
    extends: ['@taoliujun/eslint-config'],
    overrides: [
        {
            files: ['./.github/actions/**/*.[jt]s'],
            rules: {
                camelcase: ['off'],
            },
        },
    ],
};
