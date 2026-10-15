export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Humidors' | 'Electronic cabinets' | 'Travel cases' | 'Accessories';
  wholesalePrice: number;
  retailMSRP: number;
  availability: 'in_stock' | 'low_stock' | 'out_of_stock';
  includeInSuggestions: boolean;
  description: string;
}

export interface Promotion {
  id: string;
  name: string;
  terms: string;
  startDate: string;
  endDate: string;
  appliesToGroups: ('A' | 'B' | 'C')[];
  active: boolean;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Oak 150-ct Humidor',
    sku: 'HM-150-OAK',
    category: 'Humidors',
    wholesalePrice: 185.0,
    retailMSRP: 320.0,
    availability: 'in_stock',
    includeInSuggestions: true,
    description: 'Spanish cedar lined with brass lock and analog hygrometer.',
  },
  {
    id: 'prod-2',
    name: 'Ember 40-ct Electronic Cabinet',
    sku: 'EC-040-EMB',
    category: 'Electronic cabinets',
    wholesalePrice: 340.0,
    retailMSRP: 580.0,
    availability: 'in_stock',
    includeInSuggestions: true,
    description: 'Thermoelectric cooling and heating with active electronic humidity control.',
  },
  {
    id: 'prod-3',
    name: 'Cedar Glass-Top 75-ct',
    sku: 'HM-075-GLT',
    category: 'Humidors',
    wholesalePrice: 95.0,
    retailMSRP: 175.0,
    availability: 'low_stock',
    includeInSuggestions: true,
    description: 'Tempered glass lid, gold-plated quadrant hinges, dual cedar dividers.',
  },
  {
    id: 'prod-4',
    name: 'Sable 25-ct Travel Case',
    sku: 'TC-025-SBL',
    category: 'Travel cases',
    wholesalePrice: 42.0,
    retailMSRP: 85.0,
    availability: 'in_stock',
    includeInSuggestions: true,
    description: 'Crushproof molded ABS shell with custom foam cradle and airtight gasket.',
  },
  {
    id: 'prod-5',
    name: 'Digital Brass Hygrometer',
    sku: 'AC-HYG-BRS',
    category: 'Accessories',
    wholesalePrice: 18.5,
    retailMSRP: 38.0,
    availability: 'in_stock',
    includeInSuggestions: true,
    description: 'Precision digital sensor calibrated to ±1% RH with brushed brass bezel.',
  },
  {
    id: 'prod-6',
    name: 'Spanish Cedar Divider Set',
    sku: 'AC-DIV-SPC',
    category: 'Accessories',
    wholesalePrice: 12.0,
    retailMSRP: 24.0,
    availability: 'in_stock',
    includeInSuggestions: true,
    description: 'Kiln-dried aromatic Spanish cedar partitions for shelf modularity.',
  },
  {
    id: 'prod-7',
    name: 'Humidification Gel, 4 oz',
    sku: 'AC-GEL-04',
    category: 'Accessories',
    wholesalePrice: 6.5,
    retailMSRP: 14.0,
    availability: 'out_of_stock',
    includeInSuggestions: false,
    description: 'Pre-mixed 70% propylene glycol slow-release crystal jar.',
  },
];

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    name: 'Autumn Display Offer',
    terms: 'Free digital brass hygrometer with any 3 wholesale humidors ordered',
    startDate: '2026-10-01',
    endDate: '2026-11-15',
    appliesToGroups: ['A', 'B'],
    active: true,
  },
  {
    id: 'promo-2',
    name: 'New Ember Cabinet Line Announcement',
    terms: 'Wholesale spec and price sheet available on request (no unapproved discounts)',
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    appliesToGroups: ['A', 'C'],
    active: true,
  },
];
