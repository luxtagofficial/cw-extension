/**
 * Copyright (C) 2019 Contributors as noted in the AUTHORS file
 *
 * This file is part of nem2-wallet-browserextension.
 *
 * nem2-wallet-browserextension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * nem2-wallet-browserextension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with nem2-wallet-browserextension.  If not, see <http://www.gnu.org/licenses/>.
 */

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
