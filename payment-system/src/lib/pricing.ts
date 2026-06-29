export type RegistrationCategory = "FULL" | "LIMITED" | "PARTICIPANT";
export type AuthorType = "IEEE" | "NON_IEEE" | "STUDENT_IEEE" | "STUDENT_NON_IEEE" | "NON_PRESENTING";

export const EARLY_BIRD_DEADLINE = new Date("2026-07-16T00:00:00.000Z"); // Early Bird ends before 16th July 2026

export const PRICING = {
  FULL: {
    LOCAL: {
      IEEE: { earlyBird: 10, normal: 32500 },
      NON_IEEE: { earlyBird: 40000, normal: 45000 },
    },
    FOREIGN: {
      IEEE: { earlyBird: 240, normal: 290 },
      NON_IEEE: { earlyBird: 350, normal: 400 },
    },
  },
  LIMITED: {
    LOCAL: {
      IEEE: { earlyBird: 22500, normal: 25000 },
      NON_IEEE: { earlyBird: 30000, normal: 35000 },
      STUDENT_IEEE: { earlyBird: 15000, normal: 17500 },
      STUDENT_NON_IEEE: { earlyBird: 20000, normal: 25000 },
      NON_PRESENTING: { earlyBird: 5000, normal: 7500 },
    },
    FOREIGN: {
      IEEE: { earlyBird: 200, normal: 250 },
      NON_IEEE: { earlyBird: 300, normal: 350 },
      STUDENT_IEEE: { earlyBird: 100, normal: 175 },
      STUDENT_NON_IEEE: { earlyBird: 150, normal: 250 },
      NON_PRESENTING: { earlyBird: 50, normal: 75 },
    },
  },
  PARTICIPANT: {
    LOCAL: { earlyBird: 5000, normal: 7500 },
    FOREIGN: { earlyBird: 50, normal: 75 },
  },
  EXTRA_BANQUET: {
    LOCAL: 10000,
    FOREIGN: 50,
  },
};

export function calculateAmount(
  category: string,
  authorType: string,
  isLocal: boolean,
  extraBanquetTickets: number
): number {
  const currentDate = new Date();
  const isEarlyBird = currentDate < EARLY_BIRD_DEADLINE;
  
  let amount = 0;
  const timeKey = isEarlyBird ? "earlyBird" : "normal";
  const locKey = isLocal ? "LOCAL" : "FOREIGN";

  if (category === "FULL") {
    // In Full Registration, authors are strictly IEEE or NON_IEEE
    const typeKey = authorType === "IEEE" ? "IEEE" : "NON_IEEE";
    amount = PRICING.FULL[locKey][typeKey][timeKey];
  } else if (category === "LIMITED") {
    // Ensure we safely map the authorType
    const validAuthorTypes = ["IEEE", "NON_IEEE", "STUDENT_IEEE", "STUDENT_NON_IEEE", "NON_PRESENTING"];
    if (validAuthorTypes.includes(authorType)) {
      amount = PRICING.LIMITED[locKey][authorType as keyof typeof PRICING.LIMITED.LOCAL][timeKey];
    } else {
      // Default fallback just in case
      amount = PRICING.LIMITED[locKey]["NON_IEEE"][timeKey];
    }
  } else if (category === "PARTICIPANT") {
    amount = PRICING.PARTICIPANT[locKey][timeKey];
  }

  amount += extraBanquetTickets * PRICING.EXTRA_BANQUET[locKey];

  return amount;
}
