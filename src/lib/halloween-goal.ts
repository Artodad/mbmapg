/** Donations and sponsorships only. Wristband sales are not included. */
export const HALLOWEEN_DONATION_GOAL = 5000;
export const HALLOWEEN_DONATION_RAISED = 2220;

export const HALLOWEEN_DONATION_NOTE =
  'Thank you to every family who has given. 🧡 Donations and sponsorships as of Oct 23, 2026.';

export function formatGoalDollars(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-US')}`;
}

export function halloweenGoalMarks(goal = HALLOWEEN_DONATION_GOAL): number[] {
  return [0, 0.25, 0.5, 0.75, 1].map((part) => Math.round(goal * part));
}

export function halloweenGoalProgress(raised = HALLOWEEN_DONATION_RAISED, goal = HALLOWEEN_DONATION_GOAL) {
  const percent = Math.min(100, (raised / goal) * 100);
  return {
    percent,
    percentLabel: `${percent.toFixed(0)}% of our goal`,
    remainingLabel: `${formatGoalDollars(goal - raised)} to go`,
  };
}
