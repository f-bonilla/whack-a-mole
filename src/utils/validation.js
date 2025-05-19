export function validateAndSanitizeUsername(username) {
  username = username.trim();

  const htmlTagsRegex = /<[^>]*>/;
  if (htmlTagsRegex.test(username)) {
    return null; // Si contiene código HTML, lo rechazamos
  }

  if (username.length < 3) return null;

  return username;
}
