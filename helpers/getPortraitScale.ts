export function getPortraitScale(aspect?: string | number) {
  const value = Number(aspect) || 0;
  const scale = 1 - (value / 100) * 0.3;
  return Math.max(scale, 0.4); // Ne legyen túl kicsi soha
}