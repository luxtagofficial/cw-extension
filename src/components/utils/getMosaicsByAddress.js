/* eslint-disable indent */
import { flatMap, toArray, map } from 'rxjs/operators';
import {
  MosaicService,
  AccountHttp,
  MosaicHttp,
  BlockchainHttp,
} from 'nem2-sdk';
import { formatMosaics, sortMosaics } from './formatMosaics';

const getMosaicsByAddress = async (wallet) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { address } = wallet.account;
      const endpoint = wallet.node;
      const mosaicService = new MosaicService(
        new AccountHttp(endpoint),
        new MosaicHttp(endpoint),
      );

      // @TODO: BlockHeight at a higher level, sync with the network
      const blockChainHttp = new BlockchainHttp(endpoint);
      const blockHeight = (await blockChainHttp
        .getBlockchainHeight()
        .toPromise()).compact();

      mosaicService
        .mosaicsAmountViewFromAddress(address)
        .pipe(
          flatMap(x => x),
          map(mosaic => formatMosaics(mosaic, blockHeight)),
          toArray(),
        )
        .subscribe(
          (x) => {
            if (x.length !== 0) {
              resolve(sortMosaics(x));
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
