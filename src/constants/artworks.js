export const CATEGORIES = {
  1: { label: 'Digital Art', value: 1 },
  2: { label: 'Multimedia', value: 2 },
  3: { label: 'Painting', value: 3, csvValue: 'Drawing' },
  4: { label: 'Photography', value: 4, csvValue: 'Photography' },
  5: { label: 'Print', value: 5 },
  6: { label: 'Sculpture', value: 6, csvValue: 'Sculpture' },
  7: { label: 'Video', value: 7, csvValue: 'File/Video' },
  8: { label: 'Work on Paper', value: 8 },
};

export const STATUSES = {
  1: { label: 'Available', value: 1, csvValue: 'available' },
  2: { label: 'Unavailable', value: 2, csvValue: 'unavailable' },
  3: { label: 'Consigned', value: 3, csvValue: 'consigned' },
  4: { label: 'Loaned', value: 4, csvValue: 'loaned' },
  5: { label: 'Sold', value: 5, csvValue: 'sold' },
  6: { label: 'Work in progress', value: 6, csvValue: 'in_progress' },
};

export const METRICS = {
  1: { label: 'Centimeters', value: 1, csvValue: 'cm' },
  2: { label: 'Inches', value: 2, csvValue: 'in' },
};

export const CURRENCIES = {
  1: { label: '$', idString: 'USD' },
  2: { label: '€', idString: 'EUR' },
  3: { label: '£', idString: 'GBP' },
  4: { label: 'AUD', idString: 'AUD' },
  5: { label: 'INR', idString: 'INR' },
  6: { label: 'CAD', idString: 'CAD' },
  7: { label: 'SGD', idString: 'SGD' },
  8: { label: 'ZAR', idString: 'ZAR' },
};

export const CSV_CATEGORIES_MAPPING = {
  'Net Art': 'Digital Art',
  'Digital Art': 'Digital Art',
  'Web Art': 'Digital Art',
  Painting: 'Painting',
  Photography: 'Photography',
  Video: 'Video',
  'Mixed media': 'Multimedia',
  Multimedia: 'Multimedia',
  Installation: 'Sculpture',
  Sculpture: 'Sculpture',
  'Work on paper': 'Work on paper',
  Drawing: 'Work on paper',
  Illustration: 'Work on paper',
  Print: 'Work on paper',
};

export const BE_MIME_TYPES_MAP = {
  'image/jpeg': 1,
  'image/jpg': 1,
  'image/png': 2,
  'image/tiff': 3,
  'image/tif': 3,
};

export const MIME_EXTENSIONS_MAP = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/tiff': 'tiff',
  'image/tif': 'tiff',
};

export const ARTWORK_IMAGE_STATES = {
  UPLOADING: 1,
  READY: 2,
};
