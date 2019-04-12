// eslint-disable-next-line import/prefer-default-export
export const networkCurrencyIdToName = (id) => {
  // @TODO: Dynamic initialisation of network currencies at boot time
  const i = id.toUpperCase();
  switch (i) {
    case '77A1969932D987D7': return 'cat:currency';
    case '0651FBA41C7D4E2F': return 'cat:harvest';
    default: return i;
  }
};

export const networkCurrencyIds = [
  '77A1969932D987D7',
  '0651FBA41C7D4E2F',
];

export const networkCurrencyNames = [
  'cat:currency',
  'cat:harvest',
];
