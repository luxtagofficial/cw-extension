// eslint-disable-next-line import/prefer-default-export
export const networkCurrencyIdToName = (id) => {
  // @TODO: Dynamic initialisation of network currencies at boot time
  const i = id.toUpperCase();
  switch (i) {
    case '77A1969932D987D7': return 'cat:currency';
    case '0651FBA41C7D4E2F': return 'cat:harvest';
    case '85BBEA6CC462B244': return 'cat:currency'; // @TODO: delete when aliases are supported
    default: return i;
  }
};

export const networkCurrencyIds = [
  '77A1969932D987D7',
  '0651FBA41C7D4E2F',
  '85BBEA6CC462B244', // @TODO: delete when aliases are supported
];

export const networkCurrencyNames = [
  'cat:currency',
  'cat:harvest',
];
