export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/prajwalindrakh-mlmondays' : '';
  return `${basePath}${path.startsWith('/') ? path : '/' + path}`;
}