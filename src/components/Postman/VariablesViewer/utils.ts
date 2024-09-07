export function parseDateKey(dateKey: string) {
  return [dateKey.slice(0, 13), dateKey.slice(14)];
}

export function createDateKey(date: string, key: string) {
  return `${date}:${key}`;
}
