export function isDataCheck(data: any) {
  if (typeof data === 'undefined' || data === null || data === '' || data.length === 0) return false;
  return true;
}
