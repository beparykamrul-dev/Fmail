import { format, isToday, isYesterday } from 'date-fns';

export function formatEmailDate(dateString: string): string {
  const date = new Date(dateString);
  if (isToday(date)) {
    return format(date, 'h:mm a');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'MMM d');
  }
}

export function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
