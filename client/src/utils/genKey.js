export default (text, index) => {
  return `${text
    .trim()
    .toLowerCase()
    .replace(/ /, '-')}_${index}`;
};
