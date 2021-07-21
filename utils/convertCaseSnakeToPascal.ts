export const convertCaseSnakeToPascal = (snakeString: string) => {
  return snakeString
    .split('_')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join('');
};
