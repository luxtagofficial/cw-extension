/* eslint-disable indent */
import { flatMap, toArray, map } from 'rxjs/operators';
import {
  MosaicService,
  AccountHttp,
  MosaicHttp,
  BlockchainHttp,
  Address,
  NamespaceHttp,
  NamespaceId,
} from 'nem2-sdk';

const expirationText = (expiration) => {
  const expired = expiration < 0;
  switch (expired) {
    case true:
      return [true, `Expired for ${-expiration} blocks`];
    default:
      return [false, `Expires in ${expiration} blocks`];
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

const sortMosaics = (mosaics, primaryCurrencyNames) => {
  const catCurrency = typeof mosaics.find(m => m.title === primaryCurrencyNames[0]) !== 'undefined'
    ? [mosaics.find(m => m.title === primaryCurrencyNames[0])]
    : [];

  const catHarvest = typeof mosaics.find(m => m.title === primaryCurrencyNames[1]) !== 'undefined'
    ? [mosaics.find(m => m.title === primaryCurrencyNames[1])]
    : [];

  const notPrimary = mosaics.filter((m) => {
    return (
      m.title !== primaryCurrencyNames[0]
      && m.title !== primaryCurrencyNames[1]
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

const getMosaicsByAddress = async (wallet) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { address } = wallet.account;
      const endpoint = wallet.node;
      const mosaicService = new MosaicService(
        new AccountHttp(endpoint),
        new MosaicHttp(endpoint),
      );

      const blockChainHttp = new BlockchainHttp(endpoint);
      const blockHeight = (await blockChainHttp
        .getBlockchainHeight()
        .toPromise()).compact();

      const namespaceHttp = new NamespaceHttp(endpoint);
      const primaryCurrencyNames = ['cat.currency', 'cat.harvest'];
      const primaryCurrencyIdsProms = primaryCurrencyNames
        .map(pcn => namespaceHttp.getLinkedMosaicId(new NamespaceId(pcn)).toPromise());
      const primaryCurrencyIds = await Promise.all(primaryCurrencyIdsProms);
      const primaryCurrencyHexIds = primaryCurrencyIds.map(id => id.toHex());
      mosaicService
        .mosaicsAmountViewFromAddress(address)
        .pipe(
          flatMap(x => x),
          map((x) => {
            // eslint-disable-next-line max-len
            const height = x.mosaicInfo.height.compact();
            const expiration = height + x.mosaicInfo.duration.compact() - blockHeight;
            return {
              title: primaryCurrencyHexIds.indexOf(x.mosaicInfo.mosaicId.toHex()) > -1
                ? primaryCurrencyNames[primaryCurrencyHexIds.indexOf(x.mosaicInfo.mosaicId.toHex())]
                : x.mosaicInfo.mosaicId.toHex(),
              metaId: x.mosaicInfo.metaId,
              balance: x.relativeAmount().toString(10),
              amount: x.amount.compact(),
              active: height === 1 ? true : !expirationText(expiration)[0],
              expirationText: height === 1 ? '' : expirationText(expiration)[1],
              divisibility: x.mosaicInfo.divisibility,
              supply: x.mosaicInfo.supply.compact(),
              supplyMutable: x.mosaicInfo.isSupplyMutable(),
              transferable: x.mosaicInfo.isTransferable(),
              owner: new Address(x.mosaicInfo.owner.address.address).pretty(),
            };
          }),
          toArray(),
        )
        .subscribe(
          (x) => {
            if (x.length !== 0) {
              resolve(sortMosaics(x, primaryCurrencyNames));
            } else {
              resolve([]);
            }
          },
          err => reject(err),
        );
    } catch (error) {
      reject(error);
    }
  });
};

export default getMosaicsByAddress;
