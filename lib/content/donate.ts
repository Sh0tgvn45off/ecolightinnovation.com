export const donation = {
  paypal: {
    handle: "ecolightzm",
    email: "ecolight.zm@gmail.com",
    link: (amountUsd?: number) =>
      `https://www.paypal.com/paypalme/ecolightzm${amountUsd && amountUsd > 0 ? `/${amountUsd}USD` : ""}`,
  },
  mobileMoney: {
    number: "+260 97 3032559",
    providers: ["Airtel Money", "M-PESA", "PawaPay"],
  },
  // Exactly as published on the previous site. The account name must match the bank's records.
  bank: [
    { label: "Bank", value: "EcoBank Zambia" },
    { label: "Account name", value: "Vanny Kasahi" },
    { label: "Account number", value: "5622500005543" },
    { label: "SWIFT code", value: "ECOCZMLU" },
    { label: "Branch", value: "Eco Bank, Cairo Road" },
    { label: "Reference", value: "Donation" },
  ],
  oneTimeAmounts: [10, 25, 50, 100],
  monthlyAmounts: [5, 10, 20],
} as const;

export const donationImpact = [
  {
    title: "Provide lighting",
    body: "A small donation can fund a solar lamp for a household, replacing a dangerous kerosene lamp.",
    icon: "lightbulb",
  },
  {
    title: "Empower education",
    body: "Support solar lighting for pupils and schools, so children can study after dark.",
    icon: "book",
  },
  {
    title: "Improve health",
    body: "Help bring solar power to rural clinics, for refrigerated medicines and night-time care.",
    icon: "heart",
  },
  {
    title: "Boost livelihoods",
    body: "Help small businesses stay open longer and work more productively with reliable light.",
    icon: "store",
  },
] as const;
