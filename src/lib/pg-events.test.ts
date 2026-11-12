import assert from 'node:assert/strict';
import test from 'node:test';
import {
  eventPageHref,
  homeComingUp,
  pgEvents,
  todayYmd,
  upcomingEvents,
  type PgEvent,
} from './pg-events.ts';

const sample: PgEvent[] = [
  { start: '2026-09-11', end: '2026-09-11', title: 'Pizza lunch order deadline' },
  { start: '2026-09-18', end: '2026-09-18', title: 'First Pizza Friday', detail: 'cheese pizza' },
  { start: '2026-10-09', end: '2026-10-09', title: 'Fall Family Movie Night', detail: 'upper lot' },
  { start: '2026-10-30', end: '2026-10-30', title: 'Halloween Carnival' },
  { start: '2027-02-26', end: '2027-02-26', title: 'Jog-A-Thon' },
];

test('homeComingUp elevates the next two non-pizza dates', () => {
  const next = homeComingUp('2026-09-20', sample);
  assert.deepEqual(
    next.map((event) => event.title),
    ['Fall Family Movie Night', 'Halloween Carnival'],
  );
});

test('homeComingUp skips pizza titles', () => {
  const next = homeComingUp('2026-09-10', sample);
  assert.equal(next.some((event) => /pizza/i.test(event.title)), false);
  assert.equal(next[0]?.title, 'Fall Family Movie Night');
});

test('homeComingUp is empty after the school year', () => {
  assert.deepEqual(homeComingUp('2027-06-05', sample), []);
});

test('October 15, 2026 coming up is the carnival and Thanksgiving Feast, not Movie Night', () => {
  const next = homeComingUp('2026-10-15');
  assert.deepEqual(
    next.map((event) => event.title),
    ['Halloween Carnival', 'Thanksgiving Feast'],
  );
});

test('November 12, 2026 coming up starts with Thanksgiving Feast', () => {
  const next = homeComingUp('2026-11-12');
  assert.deepEqual(
    next.map((event) => event.title),
    ['Thanksgiving Feast', 'Winter Book Fair'],
  );
});

test('Penguin Patch Holiday Shop is December 14–15, 2026', () => {
  const penguin = pgEvents.find((event) => event.title === 'Penguin Patch Holiday Shop');
  assert.equal(penguin?.start, '2026-12-14');
  assert.equal(penguin?.end, '2026-12-15');
  assert.equal(penguin?.detail, '7:45–8:45am and 3–5pm');
});

test('upcomingEvents sorts later events after earlier ones even if the list is out of order', () => {
  const shuffled: PgEvent[] = [
    { start: '2026-12-14', end: '2026-12-15', title: 'Penguin Patch Holiday Shop' },
    { start: '2026-11-20', end: '2026-11-20', title: 'Thanksgiving Feast' },
  ];
  const upcoming = upcomingEvents('2026-11-12', shuffled);
  assert.deepEqual(
    upcoming.map((event) => event.title),
    ['Thanksgiving Feast', 'Penguin Patch Holiday Shop'],
  );
});

test('eventPageHref maps known event pages and falls back to events', () => {
  assert.equal(
    eventPageHref({ start: '2026-08-22', end: '2026-08-22', title: 'Welcome Back Meet & Greet' }),
    'events/welcome-back-meet-greet',
  );
  assert.equal(
    eventPageHref({ start: '2027-02-26', end: '2027-02-26', title: 'Jog-A-Thon' }),
    'jog-a-thon',
  );
  assert.equal(
    eventPageHref({ start: '2026-09-18', end: '2026-09-18', title: 'First Pizza Friday' }),
    'pizza-lunch',
  );
  assert.equal(
    eventPageHref({ start: '2026-10-09', end: '2026-10-09', title: 'Fall Family Movie Night' }),
    'events',
  );
});

test('todayYmd uses the Pacific calendar date', () => {
  const lateUtc = new Date('2026-09-21T04:30:00.000Z');
  assert.equal(todayYmd(lateUtc), '2026-09-20');
});

test('upcomingEvents still includes pizza dates for the events page', () => {
  const upcoming = upcomingEvents('2026-09-10', sample);
  assert.equal(upcoming[0]?.title, 'Pizza lunch order deadline');
});
