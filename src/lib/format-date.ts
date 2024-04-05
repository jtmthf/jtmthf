const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatDateToRFC822(date: Date): string {
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timeZoneOffset = date.getTimezoneOffset();
  const timeZoneOffsetHours = Math.abs(Math.floor(timeZoneOffset / 60));
  const timeZoneOffsetMinutes = Math.abs(timeZoneOffset % 60);
  const timeZoneSign = timeZoneOffset >= 0 ? '-' : '+';

  return `${day}, ${dayOfMonth} ${month} ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${timeZoneSign}${timeZoneOffsetHours.toString().padStart(2, '0')}${timeZoneOffsetMinutes.toString().padStart(2, '0')}`;
}
