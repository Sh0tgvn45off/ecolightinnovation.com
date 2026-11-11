export const donation = {
  // PayPal is unavailable for now, so international donors arrange their gift with us on WhatsApp.
  international: {
    whatsapp: "https://wa.link/r67je1",
  },
  mobileMoney: {
    number: "+260 97 3032559",
    providers: ["Airtel Money", "M-PESA", "PawaPay"],
  },
  // Ecobank account details as provided by EcoLight. The account name must match the bank's records exactly.
  bank: [
    { label: "Bank", value: "Ecobank Zambia" },
    { label: "Account name", value: "ECOLIGHT INNOVATION" },
    { label: "Account number", value: "5622500009342" },
    { label: "Account type", value: "Savings" },
    { label: "Branch", value: "Ecobank Cairo Road, Lusaka, Zambia" },
    { label: "SWIFT code", value: "ECOCZMLU" },
    { label: "Branch code", value: "360003" },
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
