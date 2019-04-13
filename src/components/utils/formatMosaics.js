/* eslint-disable indent */
import {
  Address,
} from 'nem2-sdk';

import { networkCurrencyIdToName, networkCurrencyNames } from './nerworkCurrencyToName';

const expirationText = (expiration) => {
 const expired = expiration < 0;
 switch (expired) {
   case true:
     return {
       isActive: true,
       text: `Expired for ${(-expiration).toLocaleString()} blocks`,
     };
   default:
     return {
      isActive: false,
      text: `Expires in ${expiration.toLocaleString()} blocks`,
    };
 }
};

const sortAlpha = (arr) => {
 if (arr) {
   return arr.sort((a, b) => {
     const nameA = a.title;
     const nameB = b.title;
     if (nameA < nameB) return -1;
     if (nameA > nameB) return 1;
     return 0;
   });
 }
 return [];
};

export const sortMosaics = (mosaics) => {
  const catCurrency = typeof mosaics.find(m => m.title === networkCurrencyNames[0]) !== 'undefined'
    ? [mosaics.find(m => m.title === networkCurrencyNames[0])]
    : [];

  const catHarvest = typeof mosaics.find(m => m.title === networkCurrencyNames[1]) !== 'undefined'
    ? [mosaics.find(m => m.title === networkCurrencyNames[1])]
    : [];

  const notPrimary = mosaics.filter((m) => {
    return (
      m.title !== networkCurrencyNames[0]
      && m.title !== networkCurrencyNames[1]
    );
  });

  const notExpired = sortAlpha(notPrimary.filter(m => m.active === true));
  const expired = sortAlpha(notPrimary.filter(m => m.active === false));

  return [
    ...catCurrency,
    ...catHarvest,
    ...notExpired,
    ...expired,
  ];
};

// eslint-disable-next-line import/prefer-default-export
export const formatMosaics = (mosaic, blockHeight) => {
 // eslint-disable-next-line max-len
 const height = mosaic.mosaicInfo.height.compact();
 const expiration = height + mosaic.mosaicInfo.duration.compact() - blockHeight;
 return {
   title: networkCurrencyIdToName(mosaic.mosaicInfo.mosaicId.toHex()),
   metaId: mosaic.mosaicInfo.metaId,
   balance: mosaic.relativeAmount().toString(10),
   amount: mosaic.amount.compact(),
   active: mosaic.mosaicInfo.duration.compact() === 0
    ? true
    : !expirationText(expiration).isActive,
   expirationText: mosaic.mosaicInfo.duration.compact() === 0
    ? 'unlimited'
    : expirationText(expiration).text,
   divisibility: mosaic.mosaicInfo.divisibility,
   supply: mosaic.mosaicInfo.supply.compact(),
   supplyMutable: mosaic.mosaicInfo.isSupplyMutable(),
   transferable: mosaic.mosaicInfo.isTransferable(),
   owner: new Address(mosaic.mosaicInfo.owner.address.address).pretty(),
   id: mosaic.mosaicInfo.mosaicId.toHex(),
 };
};