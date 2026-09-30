import assert from 'node:assert/strict';
import test from 'node:test';
import {
  carnivalNonprofitSentence,
  currentWristbandTier,
  currentWristbandTierNow,
  checkoutBoxesReady,
  sponsorships,
  sponsorshipZeffyBuyHref,
  sponsorshipZeffyFormLink,
  wristbandTiers,
  wristbandZeffyBuyHref,
  wristbandZeffyFormLink,
  zeffyDonationCheckboxLabel,
  zeffyFeeCheckboxLabel,
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

test('both checkout boxes are required before Buy is allowed', () => {
  assert.equal(checkoutBoxesReady([false, false]), false);
  assert.equal(checkoutBoxesReady([true, false]), false);
  assert.equal(checkoutBoxesReady([false, true]), false);
  assert.equal(checkoutBoxesReady([true]), false);
  assert.equal(checkoutBoxesReady([true, true, true]), false);
  assert.equal(checkoutBoxesReady([true, true]), true);
  assert.equal(
    zeffyFeeCheckboxLabel,
    'MBMA uses Zeffy so 100% of your payment goes to MBMA with no processing fees. Zeffy separately suggests an optional contribution to its platform at checkout. This does not go to MBMA and can be changed to $0.*',
  );
  assert.equal(
    zeffyDonationCheckboxLabel,
    'Please make sure to confirm the Zeffy Donation amount as this does not go to MBMA.*',
  );
});

test('carnival sentence is the flyer wording', () => {
  assert.equal(
    carnivalNonprofitSentence,
    "The carnival is a non-profit event for the sole purpose of the children's enjoyment. Please consider becoming a sponsor.",
  );
});
