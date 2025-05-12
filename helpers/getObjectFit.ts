export function getObjectFit(aspectValue?: string) {
  if (!aspectValue) return 'cover'; // default

  const value = Number(aspectValue);

  if (value <= 0) return 'cover';     // 0% → cover
  if (value >= 100) return 'contain'; // 100% → contain

  return value > 50 ? 'contain' : 'cover';
}