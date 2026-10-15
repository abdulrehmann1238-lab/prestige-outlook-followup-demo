// Seeded pseudo-random generator mulberry32
export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const CITIES = [
  { city: 'Dallas', state: 'TX', zip: '75201' },
  { city: 'Houston', state: 'TX', zip: '77002' },
  { city: 'Fort Worth', state: 'TX', zip: '76102' },
  { city: 'Atlanta', state: 'GA', zip: '30303' },
  { city: 'Miami', state: 'FL', zip: '33101' },
  { city: 'Orlando', state: 'FL', zip: '32801' },
  { city: 'Charlotte', state: 'NC', zip: '28202' },
  { city: 'Raleigh', state: 'NC', zip: '27601' },
  { city: 'Nashville', state: 'TN', zip: '37201' },
  { city: 'Memphis', state: 'TN', zip: '38103' },
  { city: 'Birmingham', state: 'AL', zip: '35203' },
  { city: 'New Orleans', state: 'LA', zip: '70112' },
  { city: 'Richmond', state: 'VA', zip: '23219' },
  { city: 'Charleston', state: 'SC', zip: '29401' },
  { city: 'Louisville', state: 'KY', zip: '40202' },
  { city: 'Indianapolis', state: 'IN', zip: '46204' },
  { city: 'Columbus', state: 'OH', zip: '43215' },
  { city: 'Cincinnati', state: 'OH', zip: '45202' },
  { city: 'Kansas City', state: 'MO', zip: '64105' },
  { city: 'Denver', state: 'CO', zip: '80202' },
  { city: 'Phoenix', state: 'AZ', zip: '85001' },
  { city: 'Las Vegas', state: 'NV', zip: '89101' },
  { city: 'Salt Lake City', state: 'UT', zip: '84101' },
];

export const PREFIXES = [
  'Royal', 'Vintage', 'Havana', 'Crown', 'Old Oak', 'St. James', 'Apex', 'Heritage',
  'Briar', 'Blue Ridge', 'Grand Reserve', 'Timber & Ash', 'Piedmont', 'Magnolia',
  'Crossroads', 'Foundry', 'Sovereign', 'Palmetto', 'Crescent City', 'Ironwood',
  'Smoky Mountain', 'Commonwealth', 'Bayou', 'Lone Star', 'Highland', 'Frontier'
];

export const SUFFIXES = [
  'Cigar Lounge', 'Tobacconists', 'Fine Smokes', 'Humidor Room', 'Pipe & Leaf',
  'Cigar Co.', 'Smoke Shop', 'Tobacco Merchants', 'Leaf & Barrel', 'Cigar Emporium',
  'Humidors & Habanas', 'Cigar Exchange', 'Sanctuary'
];

export const FIRST_NAMES = [
  'James', 'Robert', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas',
  'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald',
  'Steven', 'Andrew', 'Paul', 'Joshua', 'Kenneth', 'Kevin', 'Brian', 'George',
  'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan', 'Jacob', 'Gary',
  'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon'
];

export const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'
];
