export type PgEvent = {
  start: string;
  end: string;
  title: string;
  detail?: string;
};

export const pgCalStart = { year: 2026, month: 8 };
export const pgCalEnd = { year: 2027, month: 6 };
export const pgCalDefault = { year: 2026, month: 8 };

export const pgEvents: PgEvent[] = [
  {
    start: '2026-08-22',
    end: '2026-08-22',
    title: 'Welcome Back Meet & Greet',
    detail: 'Standley Park, 10am–12pm',
  },
  {
    start: '2026-08-28',
    end: '2026-08-28',
    title: 'Pizza lunch sign up begins. Deadline to order is September 11.',
  },
  {
    start: '2026-09-04',
    end: '2026-09-04',
    title: 'First Parent Group meeting',
    detail: '8:30–9:00am in the library',
  },
  {
    start: '2026-09-11',
    end: '2026-09-11',
    title: 'Pizza lunch order deadline',
  },
  {
    start: '2026-09-18',
    end: '2026-09-18',
    title: 'First Pizza Friday',
    detail: 'pack healthy sides to go with cheese pizza',
  },
  {
    start: '2026-10-09',
    end: '2026-10-09',
    title: 'Fall Family Movie Night',
    detail: '5:30–8:30pm on the upper lot',
  },
  {
    start: '2026-10-30',
    end: '2026-10-30',
    title: 'Halloween Carnival',
    detail: 'early dismissal day, 2:30–5:30pm',
  },
  {
    start: '2026-11-16',
    end: '2026-11-19',
    title: 'Penguin Patch Holiday Shop',
    detail: '7:45–8:45am and 3–5pm',
  },
  {
    start: '2026-11-20',
    end: '2026-11-20',
    title: 'Thanksgiving Feast',
  },
  {
    start: '2026-12-07',
    end: '2026-12-11',
    title: 'Winter Book Fair',
    detail: '7:45–8:45am and 3–5pm in the auditorium',
  },
  {
    start: '2027-02-26',
    end: '2027-02-26',
    title: 'Jog-A-Thon',
    detail: '9am–1pm',
  },
  {
    start: '2027-03-06',
    end: '2027-03-06',
    title: 'Family Day Out',
  },
  {
    start: '2027-04-16',
    end: '2027-04-16',
    title: 'Spring Family Movie Night',
    detail: '5:30–8:30pm in the auditorium',
  },
  {
    start: '2027-04-26',
    end: '2027-04-30',
    title: 'Spring Book Fair',
    detail: '7:45–8:45am and 3–5pm in the auditorium',
  },
  {
    start: '2027-05-03',
    end: '2027-05-07',
    title: 'Teacher & Staff Appreciation Week',
  },
  {
    start: '2027-06-04',
    end: '2027-06-04',
    title: 'Popsicle Party',
  },
];

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export function ymKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`;
}

export function ymd(year: number, month: number, day: number): string {
  return `${ymKey(year, month)}-${String(day).padStart(2, '0')}`;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function weekdaySun(year: number, month: number, day: number): number {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

export function formatRange(event: PgEvent): string {
  const start = event.start.slice(8);
  if (event.start === event.end) {
    return String(Number(start));
  }
  const end = event.end.slice(8);
  const sameMonth = event.start.slice(0, 7) === event.end.slice(0, 7);
  if (sameMonth) {
    return `${Number(start)}–${Number(end)}`;
  }
  const endMonth = monthNames[Number(event.end.slice(5, 7)) - 1].slice(0, 3);
  return `${Number(start)}–${endMonth} ${Number(end)}`;
}

export function eventsCovering(date: string, events = pgEvents): PgEvent[] {
  return events.filter((event) => event.start <= date && date <= event.end);
}

export function eventsForMonth(year: number, month: number, events = pgEvents): PgEvent[] {
  const start = ymd(year, month, 1);
  const end = ymd(year, month, daysInMonth(year, month));
  return events.filter((event) => event.start <= end && event.end >= start);
}

export function calendarMonths(
  start = pgCalStart,
  end = pgCalEnd,
): { year: number; month: number }[] {
  const months: { year: number; month: number }[] = [];
  let year = start.year;
  let month = start.month;
  while (year < end.year || (year === end.year && month <= end.month)) {
    months.push({ year, month });
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return months;
}

export type DayCell = {
  date: string;
  day: number;
  events: PgEvent[];
  rangeStart: boolean;
  rangeEnd: boolean;
  inRange: boolean;
};

export function monthGrid(year: number, month: number, events = pgEvents): DayCell[] {
  const count = daysInMonth(year, month);
  const pad = weekdaySun(year, month, 1);
  const cells: DayCell[] = [];
  for (let i = 0; i < pad; i += 1) {
    cells.push({
      date: '',
      day: 0,
      events: [],
      rangeStart: false,
      rangeEnd: false,
      inRange: false,
    });
  }
  for (let day = 1; day <= count; day += 1) {
    const date = ymd(year, month, day);
    const covering = eventsCovering(date, events);
    const ranged = covering.filter((event) => event.start !== event.end);
    cells.push({
      date,
      day,
      events: covering,
      rangeStart: ranged.some((event) => event.start === date),
      rangeEnd: ranged.some((event) => event.end === date),
      inRange: ranged.length > 0,
    });
  }
  return cells;
}
