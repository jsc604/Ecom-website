export function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
export function convertToHyphenatedLowerCase(input: string) {
  return input.toLowerCase().replace(/\s+/g, '-');
}