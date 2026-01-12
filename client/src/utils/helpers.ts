export const getAbsoluteImageUrl = (relativePath: string): string => {
  // Assuming backend is running on http://localhost:3001
  // And serves static files from /uploads
  if (relativePath.startsWith('/uploads')) {
    return `http://localhost:3001${relativePath}`;
  }
  return relativePath; // Return as is if not an uploaded file path
};
