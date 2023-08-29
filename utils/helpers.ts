export function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
export function convertToHyphenatedLowerCase(input: string) {
  return input.toLowerCase().replace(/\s+/g, '-');
}

export function getTimeAgo(timestamp: string) {
  const now = new Date();
  const past = new Date(timestamp);
  const elapsedMilliseconds = now.getTime() - past.getTime();

  const seconds = Math.floor(elapsedMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }
}
