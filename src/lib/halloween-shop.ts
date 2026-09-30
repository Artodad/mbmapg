import { todayYmd } from './pg-events.ts';

/** Last Pacific calendar day the $45 wristband price applies, inclusive. */
export const wristband45Through = '2026-10-23';
/** First and last Pacific calendar days the $50 wristband price applies, inclusive. */
export const wristband50From = '2026-10-24';
export const wristband50Through = '2026-10-29';

export type WristbandTier = '45' | '50';

export const wristbandTiers: {
  id: WristbandTier;
  price: string;
  window: string;
}[] = [
  {
    id: '45',
    price: '$45.00',
    window: 'Through October 23, 2026',
  },
  {
    id: '50',
    price: '$50.00',
    window: 'October 24 through October 29, 2026',
  },
];

/**
 * One published form for every sponsorship.
 * The wristband is a separate campaign and must not use this URL.
 */
export const sponsorshipZeffyBuyHref =
  'https://www.zeffy.com/en-US/ticketing/2026-halloween-carnival-4';

export const sponsorshipZeffyFormLink =
  'https://www.zeffy.com/embed/ticketing/2026-halloween-carnival-4?modal=true';

/** Published $45 wristband ticket. The $50 window is listed copy, not this form. */
export const wristbandZeffyBuyHref =
  'https://www.zeffy.com/en-US/ticketing/2026-halloween-carnival-wristband';

export const wristbandZeffyFormLink =
  'https://www.zeffy.com/embed/ticketing/2026-halloween-carnival-wristband?modal=true';

/**
 * Which listed wristband price applies on a Pacific calendar date.
 * Dates after October 29, 2026 have no listed price.
 */
export function currentWristbandTier(ymd: string): WristbandTier | null {
  if (ymd <= wristband45Through) return '45';
  if (ymd >= wristband50From && ymd <= wristband50Through) return '50';
  return null;
}

export function currentWristbandTierNow(now = new Date()): WristbandTier | null {
  return currentWristbandTier(todayYmd(now));
}

export const carnivalNonprofitSentence =
  "The carnival is a non-profit event for the sole purpose of the children's enjoyment. Please consider becoming a sponsor.";

/** Required before a Halloween Buy button opens checkout. Unchecked by default. */
export const zeffyFeeCheckboxLabel =
  'MBMA uses Zeffy so 100% of your payment goes to MBMA with no processing fees. Zeffy separately suggests an optional contribution to its platform at checkout. This does not go to MBMA and can be changed to $0.*';

export const zeffyDonationCheckboxLabel =
  'Please make sure to confirm the Zeffy Donation amount as this does not go to MBMA.*';

export function checkoutBoxesReady(checked: readonly boolean[]): boolean {
  return checked.length === 2 && checked.every(Boolean);
}

export const sponsorships: { name: string; price: string }[] = [
  { name: 'Sponsor Halloween Carnival Face Painter', price: '$400.00' },
  { name: 'Sponsor Halloween Carnival Balloon Artist', price: '$300.00' },
  { name: 'Magnanimous Mummies', price: '$300.00' },
  { name: 'Philanthropic Phantoms', price: '$250.00' },
  { name: 'Bounteous Bats', price: '$100.00' },
  { name: 'Plentiful Pumpkins', price: '$50.00' },
  { name: 'Giving Goblins', price: '$25.00' },
];
