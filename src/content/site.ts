export const BRAND = {
  name: 'Ember & Oak',
  tagline: 'Slow-roasted specialty coffee',
  est: '2014',
  address: '14 Kiln Lane, Shoreditch, London E2 7DP',
  coords: '51.5266° N, 0.0755° W',
  phone: '+44 20 7946 0412',
  email: 'hello@emberandoak.coffee',
};

export type Lot = {
  id: string;
  origin: string;
  farm: string;
  process: string;
  altitude: string;
  notes: string[];
  metrics: { label: string; value: number }[];
};

export const LOTS: Lot[] = [
  {
    id: '01',
    origin: 'Yirgacheffe, Ethiopia',
    farm: 'Chelbesa Washing Station',
    process: 'Washed · Heirloom',
    altitude: '2,050 m',
    notes: ['Bergamot', 'White peach', 'Jasmine'],
    metrics: [
      { label: 'Acidity', value: 0.9 },
      { label: 'Body', value: 0.45 },
      { label: 'Sweetness', value: 0.72 },
    ],
  },
  {
    id: '02',
    origin: 'Huila, Colombia',
    farm: 'Finca El Mirador',
    process: 'Honey · Caturra',
    altitude: '1,780 m',
    notes: ['Red apple', 'Panela', 'Cocoa nib'],
    metrics: [
      { label: 'Acidity', value: 0.62 },
      { label: 'Body', value: 0.78 },
      { label: 'Sweetness', value: 0.86 },
    ],
  },
  {
    id: '03',
    origin: 'Karnataka, India',
    farm: 'Ratnagiri Estate',
    process: 'Anaerobic natural',
    altitude: '1,400 m',
    notes: ['Dried fig', 'Clove', 'Dark treacle'],
    metrics: [
      { label: 'Acidity', value: 0.34 },
      { label: 'Body', value: 0.94 },
      { label: 'Sweetness', value: 0.7 },
    ],
  },
];

export type Phase = {
  at: number;
  name: string;
  temp: number;
  time: string;
  copy: string;
};

/** Roast phases keyed to the 0→1 roast progress the scene animates. */
export const PHASES: Phase[] = [
  {
    at: 0,
    name: 'Charge',
    temp: 92,
    time: '00:00',
    copy: 'Green beans meet a hot drum. For ninety seconds nothing happens — the bean is only losing its shell of moisture.',
  },
  {
    at: 0.22,
    name: 'Drying',
    temp: 148,
    time: '02:40',
    copy: 'Grassy steam gives way to the smell of hay and bread. Water leaves; density stays.',
  },
  {
    at: 0.42,
    name: 'Maillard',
    temp: 172,
    time: '05:10',
    copy: 'Sugars and amino acids begin to trade places. This is where sweetness is decided, and it cannot be rushed.',
  },
  {
    at: 0.58,
    name: 'First crack',
    temp: 196,
    time: '08:20',
    copy: 'A sound like distant rain. Steam fractures the bean along its crease and the volume jumps by half.',
  },
  {
    at: 0.76,
    name: 'Development',
    temp: 208,
    time: '10:05',
    copy: 'Twenty-two percent of the roast happens here. Longer for the fig and treacle lots, shorter for the florals.',
  },
  {
    at: 0.92,
    name: 'Drop',
    temp: 214,
    time: '11:40',
    copy: 'Out onto the cooling tray before second crack takes the sugar. Ninety seconds of air and it is finished.',
  },
];

export type Step = {
  n: string;
  title: string;
  body: string;
};

export const BREW_STEPS: Step[] = [
  {
    n: '01',
    title: 'Rinse & warm',
    body: 'Paper rinsed, brewer warmed, scale zeroed. A cold cone steals four degrees from the extraction.',
  },
  {
    n: '02',
    title: 'Bloom',
    body: 'Twice the coffee weight in water at 94°C. Forty-five seconds while the trapped carbon dioxide leaves.',
  },
  {
    n: '03',
    title: 'Pour in spirals',
    body: 'Three pulses, centre outward, never onto the wall. The bed should stay flat and the drawdown even.',
  },
  {
    n: '04',
    title: 'Rest, then taste',
    body: 'Below 60°C the sweetness arrives. We taste every batch at three temperatures before it reaches the counter.',
  },
];

export const BREW_SPEC = [
  { label: 'Dose', value: '18 g' },
  { label: 'Water', value: '300 g' },
  { label: 'Temperature', value: '94 °C' },
  { label: 'Total time', value: '2:45' },
];

export type MenuItem = {
  n: string;
  name: string;
  detail: string;
  price: string;
};

export const MENU: MenuItem[] = [
  { n: '01', name: 'Ember Espresso', detail: 'Double · 40 ml · treacle & cocoa', price: '£3.10' },
  { n: '02', name: 'Oak Flat White', detail: '6 oz · Huila honey lot', price: '£3.80' },
  { n: '03', name: 'Kiln Cortado', detail: '4 oz · caramel, short', price: '£3.40' },
  { n: '04', name: 'Single-Origin Filter', detail: 'V60 · rotating lot', price: '£4.50' },
  { n: '05', name: 'Cold Ember', detail: '18 h slow extraction · on tap', price: '£4.20' },
  { n: '06', name: 'Cardamom Bun', detail: 'Baked at 05:30, gone by noon', price: '£3.90' },
];

export type Plate = {
  n: string;
  title: string;
  body: string;
  art: string;
};

export const PLATES: Plate[] = [
  {
    n: '01',
    title: 'The 5 a.m. drum',
    body: 'Two roasters, one probe, and eleven minutes that decide the whole day.',
    art: 'art--a',
  },
  {
    n: '02',
    title: 'Cupping table',
    body: 'Sixteen bowls, one spoon, no labels. The lot that wins gets the counter.',
    art: 'art--b',
  },
  {
    n: '03',
    title: 'Crema, close',
    body: 'Tiger-striped and settling. If it breaks before you sit down, we pull it again.',
    art: 'art--c',
  },
  {
    n: '04',
    title: 'Kiln Lane, 07:02',
    body: 'The first queue forms before the shutter is fully up. It always has.',
    art: 'art--d',
  },
  {
    n: '05',
    title: 'Bags, warm',
    body: 'Rested four days, ground to order, never more than a fortnight old.',
    art: 'art--e',
  },
];

export const HOURS = [
  { day: 'Mon — Thu', time: '07:00 — 18:00' },
  { day: 'Friday', time: '07:00 — 20:00' },
  { day: 'Saturday', time: '08:00 — 18:00' },
  { day: 'Sunday', time: '08:00 — 16:00' },
];

export const MARQUEE_ITEMS = [
  'Single origin',
  'Roasted on Kiln Lane',
  'Rested four days',
  'Ground to order',
  'No bitterness',
];
