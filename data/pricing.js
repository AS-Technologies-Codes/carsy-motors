export const pricingPlans = [
  {
    title: "Basic",
    stars: "⭐",
    description: "Reduce Excess: $5,995.00",
    title2: "Included",
    price: 0,
    features: [
      "Collision Damage & Theft Protection",
      { feature: "Windscreen, Glass, Lights & Tyres Cover", disabled: true },
      { feature: "Faster Checkout", disabled: true },
      { feature: "Faster Discounted rate", disabled: true },
    ],
  },
  {
    title: "Medium",
    stars: "⭐⭐",
    description: "Reduce Excess: $1,650.00",
    title2: "$58.00 / day",
    price: "$696.00",
    // total: "Total $696.00",
    features: [
      "Collision Damage & Theft Protection",
      "Windscreen, Glass, Lights & Tyres Cover",
      { feature: "Faster Checkout", disabled: true },
      { feature: "Faster Discounted rate", disabled: true },
    ],
  },
  {
    title: "Premium",
    stars: "⭐⭐⭐",
    badge: "-10$ Exclusive",
    description: "Reduce Excess: $0.00",
    crossPrice: "$853.39",
    title2: "$64.00 / day",
    price: "$768.05",
    // total: "Total $768.05",
    features: [
      "Collision Damage & Theft Protection",
      "Windscreen, Glass, Lights & Tyres Cover",
      "Faster Checkout",
      "Faster Discounted rate",
    ],
  },
  // {
  //   title: "Enterprise",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod",
  //   price: 99,
  //   features: [
  //     "30 advertised listings",
  //     "Top rows (Recent listings)",
  //     "Renew every 4 hours",
  //     "Facebook advert",
  //     "1 Free week",
  //     "2.5% commission when selling a car",
  //   ],
  // },
];
