export const getAssetUrl = (relativePath: string) => {
  if (!relativePath) return '';
  // Simple check to avoid prepending the host if it's already a full URL
  if (relativePath.startsWith('http')) return relativePath;
  return relativePath;
};
