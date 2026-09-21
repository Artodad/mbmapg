import assert from 'node:assert/strict';
import test from 'node:test';
import {
  eventPageHref,
  homeComingUp,
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
