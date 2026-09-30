import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  carnivalNonprofitSentence,
  currentWristbandTier,
  currentWristbandTierNow,
  balloonArtistBlurb,
  facePainterBlurb,
  sponsorships,
  sponsorshipZeffyBuyHref,
  sponsorshipZeffyFormLink,
  wristbandTiers,
  wristbandZeffyBuyHref,
  wristbandZeffyFormLink,
} from './halloween-shop.ts';

test('Sep 29, 2026 uses the $45 wristband price', () => {
  assert.equal(currentWristbandTier('2026-09-29'), '45');
});

test('$45 applies through October 23, 2026 inclusive, including late Pacific evening', () => {
  assert.equal(currentWristbandTier('2026-10-23'), '45');
  // 23:30 Pacific on Oct 23 is 06:30 UTC on Oct 24 (PDT, UTC-7).
  assert.equal(currentWristbandTierNow(new Date('2026-10-24T06:30:00.000Z')), '45');
});

test('$50 applies October 24 through October 29, 2026 inclusive', () => {
  assert.equal(currentWristbandTierNow(new Date('2026-10-24T07:30:00.000Z')), '50');
  assert.equal(currentWristbandTier('2026-10-24'), '50');
  assert.equal(currentWristbandTier('2026-10-29'), '50');
  // 23:30 Pacific on Oct 29 is 06:30 UTC on Oct 30.
  assert.equal(currentWristbandTierNow(new Date('2026-10-30T06:30:00.000Z')), '50');
});

test('no wristband price is listed after October 29, 2026', () => {
  assert.equal(currentWristbandTierNow(new Date('2026-10-30T07:30:00.000Z')), null);
  assert.equal(currentWristbandTier('2026-10-30'), null);
  assert.equal(currentWristbandTier('2026-11-01'), null);
});

test('only the two 2026 wristband prices are listed', () => {
  assert.deepEqual(
    wristbandTiers.map((tier) => tier.price),
    ['$45.00', '$50.00'],
  );
});

test('sponsorship names and amounts match the 2026 list', () => {
  assert.deepEqual(
    sponsorships.map((item) => `${item.name} ${item.price}`),
    [
      'Sponsor Halloween Carnival Face Painter $400.00',
      'Sponsor Halloween Carnival Balloon Artist $300.00',
      'Magnanimous Mummies $300.00',
      'Philanthropic Phantoms $250.00',
      'Bounteous Bats $100.00',
      'Plentiful Pumpkins $50.00',
      'Giving Goblins $25.00',
    ],
  );
});

test('only Face Painter and Balloon Artist include the Wix blurbs', () => {
  assert.equal(
    sponsorships.find((item) => item.name === 'Sponsor Halloween Carnival Face Painter')?.blurb,
    facePainterBlurb,
  );
  assert.equal(
    sponsorships.find((item) => item.name === 'Sponsor Halloween Carnival Balloon Artist')?.blurb,
    balloonArtistBlurb,
  );
  assert.deepEqual(
    sponsorships.filter((item) => item.blurb).map((item) => item.name),
    [
      'Sponsor Halloween Carnival Face Painter',
      'Sponsor Halloween Carnival Balloon Artist',
    ],
  );
});

test('sponsorship checkout is the one published 2026 carnival form', () => {
  assert.equal(
    sponsorshipZeffyBuyHref,
    'https://www.zeffy.com/en-US/ticketing/2026-halloween-carnival-4',
  );
  assert.equal(
    sponsorshipZeffyFormLink,
    'https://www.zeffy.com/embed/ticketing/2026-halloween-carnival-4?modal=true',
  );
  assert.equal(wristbandTiers.length, 2);
});

test('wristband checkout is its own $45 form and is not the sponsorship form', () => {
  assert.equal(
    wristbandZeffyBuyHref,
    'https://www.zeffy.com/en-US/ticketing/2026-halloween-carnival-wristband',
  );
  assert.equal(
    wristbandZeffyFormLink,
    'https://www.zeffy.com/embed/ticketing/2026-halloween-carnival-wristband?modal=true',
  );
  assert.notEqual(wristbandZeffyBuyHref, sponsorshipZeffyBuyHref);
});

test('halloween page keeps the ghosts and banner without pumpkins', () => {
  const page = readFileSync(new URL('../pages/shop/halloween.astro', import.meta.url), 'utf8');
  assert.equal((page.match(/class="flyer-ghost /g) ?? []).length, 2);
  assert.equal((page.match(/flyer-pumpkin/g) ?? []).length, 0);
  assert.match(page, /<p class="carnival-banner">Beware: candy and face paint<\/p>/);
  assert.match(page, /<ZeffyTipNotice \/>/);
  assert.doesNotMatch(page, /checkbox|jump scare|spider/i);
});

test('shop and halloween share the boxed Zeffy tip notice without confirmation checkboxes', () => {
  const shop = readFileSync(new URL('../pages/shop.astro', import.meta.url), 'utf8');
  const notice = readFileSync(new URL('../components/ZeffyTipNotice.astro', import.meta.url), 'utf8');
  assert.match(shop, /<ZeffyTipNotice \/>/);
  assert.match(notice, /Set Zeffy’s tip to \$0/);
  assert.match(notice, /It goes/);
  assert.match(notice, /not to MBMA or the parents group/);
  assert.doesNotMatch(notice, /checkbox/i);
  assert.doesNotMatch(shop, /type="checkbox"/);
});

test('halloween wristband section shows the official flyer and pre-sale copy', () => {
  const page = readFileSync(new URL('../pages/shop/halloween.astro', import.meta.url), 'utf8');
  assert.match(page, /images\/shop\/halloween-carnival-wristbands-flyer\.png/);
  assert.doesNotMatch(page, /halloween-carnival-wristbands-flyer\.jpg/);
  assert.match(page, /images\/shop\/halloween-wristband\.jpg/);
  assert.match(page, /images\/gallery\/halloween-pumpkins\.jpg/);
  assert.match(page, /max-width:\s*480px/);
  const copy = [
    'Pre-Sale Halloween Carnival Wristbands',
    'Every child must have a wristband to enter the carnival.  Adults and Children under 2 are free. Admission wristbands allow unlimited access to carnival games and activities (Children without admission wristbands will not be allowed entry to the carnival following the parade)',
    "You can purchase for more than one student/child - Just add to the cart with the first student's information, then go back to the shop and select the wristband again adding to the cart with the second student's information.  Repeat steps for as many wristbands needed.  Checkout when all student wristband information is in the cart.",
    'Early Bird purchase will end after Oct 23rd, and will then go to pricing @ $50.',
    'All pre-order wristbands will be put into bags handed out to students the day of the carnival.',
    'If you are purchasing for MBMA Alumni or non-MBMA persons, please pick up their ticket at the ticket booth on the day of carnival.',
  ];
  for (const line of copy) assert.match(page, new RegExp(line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.equal((page.match(/class="sponsor-art"/g) ?? []).length, 5);
  assert.match(page, /item\.name === 'Plentiful Pumpkins'/);
  assert.match(page, /item\.name === 'Giving Goblins'/);
  assert.match(page, /item\.name === 'Philanthropic Phantoms'/);
  assert.match(page, /item\.name === 'Magnanimous Mummies'/);
  assert.match(page, /item\.name === 'Bounteous Bats'/);
  assert.doesNotMatch(page, /\$60|prize ticket|checkbox/i);
});

test('carnival sentence is the flyer wording', () => {
  assert.equal(
    carnivalNonprofitSentence,
    "The carnival is a non-profit event for the sole purpose of the children's enjoyment. Please consider becoming a sponsor.",
  );
});
