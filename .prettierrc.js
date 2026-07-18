const prettier = require('@umijs/fabric/dist/prettier');

module.exports = {
  ...prettier,
  organizeImportsSkipDestructiveCodeActions: true,
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'never',
      },
    },
  ],
};
