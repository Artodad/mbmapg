import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { octoberSpotlightEvents, pgEvents } from './pg-events.ts';
import {
  isOctoberPacific,
  pacificMonth,
  resolveSiteTheme,
} from './theme.ts';

describe('pacific October gate', () => {
  it('treats late September Pacific as not October', () => {
    // 2026-10-01 06:59 UTC = 2026-09-30 23:59 PDT
    const now = new Date('2026-10-01T06:59:00.000Z');
    assert.equal(pacificMonth(now), 9);
    assert.equal(isOctoberPacific(now), false);
    assert.equal(resolveSiteTheme({ now }), 'default');
  });

  it('turns on at midnight October 1 in America/Los_Angeles', () => {
    // 2026-10-01 07:00 UTC = 2026-10-01 00:00 PDT
    const now = new Date('2026-10-01T07:00:00.000Z');
    assert.equal(pacificMonth(now), 10);
    assert.equal(isOctoberPacific(now), true);
    assert.equal(resolveSiteTheme({ now }), 'halloween');
  });

  it('stays on through late October Pacific', () => {
    const now = new Date('2026-10-31T06:59:00.000Z');
    assert.equal(pacificMonth(now), 10);
    assert.equal(resolveSiteTheme({ now }), 'halloween');
  });

  it('turns off at November in America/Los_Angeles', () => {
    const now = new Date('2026-11-01T08:00:00.000Z');
    assert.equal(pacificMonth(now), 11);
    assert.equal(resolveSiteTheme({ now }), 'default');
  });
});

describe('resolveSiteTheme overrides', () => {
  const september = new Date('2026-09-20T19:00:00.000Z');
  const october = new Date('2026-10-15T19:00:00.000Z');

  it('forces Halloween from ?theme=halloween before October', () => {
    assert.equal(resolveSiteTheme({ queryTheme: 'halloween', now: september }), 'halloween');
  });

  it('forces the default skin in October with ?theme=off', () => {
    assert.equal(resolveSiteTheme({ queryTheme: 'off', now: october }), 'default');
  });

  it('honors session storage when no query is present', () => {
    assert.equal(
      resolveSiteTheme({ storedTheme: 'halloween', now: september }),
      'halloween',
    );
    assert.equal(resolveSiteTheme({ storedTheme: 'off', now: october }), 'default');
  });

  it('honors PUBLIC_THEME=halloween when nothing else is set', () => {
    assert.equal(resolveSiteTheme({ envTheme: 'halloween', now: september }), 'halloween');
  });

  it('lets the query win over env, storage, and the calendar', () => {
    assert.equal(
      resolveSiteTheme({
        queryTheme: 'off',
        envTheme: 'halloween',
        storedTheme: 'halloween',
        now: october,
      }),
      'default',
    );
  });
});

describe('octoberSpotlightEvents', () => {
  it('returns only the dated October PG events', () => {
    const events = octoberSpotlightEvents();
    assert.deepEqual(
      events.map((event) => ({ start: event.start, title: event.title, detail: event.detail })),
      [
        {
          start: '2026-10-09',
          title: 'Fall Family Movie Night',
          detail: '5:30–8:30pm on the upper lot',
        },
        {
          start: '2026-10-30',
          title: 'Halloween Carnival',
          detail: 'early dismissal day, 2:30–5:30pm',
        },
      ],
    );
    assert.ok(events.every((event) => pgEvents.includes(event)));
  });
});
