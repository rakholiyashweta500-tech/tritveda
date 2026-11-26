/**
 * Tritveda product data.
 * Every value below is taken from the printed packaging (front and back panels).
 * Keep presentation out of this file — main.js renders it.
 */
window.TRITVEDA_PRODUCTS = [
  {
    id: 'amla',
    name: 'Tritveda Amla Powder',
    shortName: 'Amla Powder',
    subtitle: 'Indian Gooseberry',
    highlight: 'Rich in Vitamin C & Powerful Antioxidants',
    badges: ['100% Natural', 'Non-GMO'],
    netWeight: null, // not printed on the Amla pack artwork
    theme: 'forest',
    images: {
      pouch: 'assets/images/amla-pouch.webp',
      pouchSm: 'assets/images/amla-pouch-sm.webp',
      bowl: 'assets/images/amla-bowl.webp',
      leaf: 'assets/images/amla-leaf.webp',
      accent: 'assets/images/amla-fruit.webp',
    },
    ingredients: '100% Pure Dried Amla (Indian Gooseberry) Powder (No additives, preservatives, or artificial fragrance)',
    usage: [
      'Take 1 tsp (3–5g) daily with warm water, juice, or smoothies.',
      'For external use, apply as a hair or face mask by mixing with water, oil, or rose water. Leave for 15–30 minutes and rinse thoroughly.',
    ],
    nutrition: [
      ['Energy', '320 kcal'],
      ['Carbohydrates', '60 g'],
      ['Dietary Fiber', '25 g'],
      ['Protein', '4 g'],
      ['Fat', '2 g'],
      ['Vitamin C', '600 mg'],
      ['Calcium', '50 mg'],
      ['Iron', '5 mg'],
      ['Potassium', '300 mg'],
    ],
  },
  {
    id: 'moringa',
    name: 'Tritveda Moringa Powder',
    shortName: 'Moringa Powder',
    subtitle: 'Moringa Leaf',
    highlight: 'Strong Body • Clear Skin • Healthier Hair',
    badges: ['100% Natural', 'Non-GMO'],
    netWeight: '250g | 8.8oz',
    theme: 'leaf',
    images: {
      pouch: 'assets/images/moringa-pouch.webp',
      pouchSm: 'assets/images/moringa-pouch-sm.webp',
      bowl: 'assets/images/moringa-bowl.webp',
      leaf: 'assets/images/moringa-leaf.webp',
      accent: 'assets/images/moringa-bunch.webp',
    },
    ingredients: '100% Pure Moringa Leaf Powder (No additives, preservatives, or artificial fragrance)',
    usage: [
      'Take 1 tsp (3–5g) daily in warm water, smoothies, juices, or herbal teas.',
      'For external use, mix with water, rose water, or aloe vera gel to make a nourishing hair or face mask.',
    ],
    nutrition: [
      ['Energy', '310 kcal'],
      ['Protein', '26 g'],
      ['Fat', '5.5 g'],
      ['Saturated Fat', '1.2 g'],
      ['Carbohydrates', '38 g'],
      ['Sugars', '6.5 g'],
      ['Dietary Fiber', '22.5 g'],
      ['Vitamin C', '17 mg'],
      ['Iron', '22.5 mg'],
      ['Calcium', '350 mg'],
      ['Potassium', '1100 mg'],
      ['Magnesium', '225 mg'],
    ],
  },
];

window.TRITVEDA_PACK_NOTES = {
  storage: 'Store in a cool, dry place away from sunlight and moisture, and seal tightly after use.',
  shelfLife: 'Best before 18 months from date of packaging.',
  disclaimer: 'This product is not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before use, especially if pregnant, nursing, or under medication.',
};
