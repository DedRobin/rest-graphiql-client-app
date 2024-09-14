export function formatDateTime(dateInt: number): string {
  const date = new Date(dateInt);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return `${formattedDate}, ${formattedTime}`;
}
