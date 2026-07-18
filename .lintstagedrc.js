module.exports = {
  // ts
  'src/**/*.ts?(x)': () => 'npm run lint:type',
  'packages/**/*.ts?(x)': () => 'npm run lint:type',
  '.dumi/**/*.ts?(x)': () => 'npm run lint:type',
  // eslint
  'src/**/*.(ts|js)?(x)': (filenames) =>
    `eslint --fix ${filenames.map((each) => '"' + each + '"').join(' ')}`,
  'packages/**/*.(ts|js)?(x)': (filenames) =>
    `eslint --fix ${filenames.map((each) => '"' + each + '"').join(' ')}`,
  '.dumi/**/*.(ts|js)?(x)': (filenames) =>
    `eslint --fix ${filenames.map((each) => '"' + each + '"').join(' ')}`,
  // prettier
  'src/**/*.(js|ts|jsx|tsx|css|less|json)': (filenames) =>
    `prettier --write ${filenames.map((each) => '"' + each + '"').join(' ')}`,
  'packages/**/*.(js|ts|jsx|tsx|css|less|json)': (filenames) =>
    `prettier --write ${filenames.map((each) => '"' + each + '"').join(' ')}`,
  '.dumi/**/*.(js|ts|jsx|tsx|css|less|json)': (filenames) =>
    `prettier --write ${filenames.map((each) => '"' + each + '"').join(' ')}`,
};
