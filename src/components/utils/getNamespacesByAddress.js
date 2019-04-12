import {
  NamespaceHttp, BlockchainHttp,
} from 'nem2-sdk';
import {
  mergeMap, map,
} from 'rxjs/operators';
import { formatNamespaces } from './formatNamespaces';

// eslint-disable-next-line import/prefer-default-export
export const getNamespacesByAddress = async wallet => new Promise(async (resolve, reject) => {
  const namespaces = [];
  const endpoint = wallet.node;
  const { address } = wallet.account;
  const blockChainHttp = new BlockchainHttp(endpoint);
  const blockHeight = (await blockChainHttp.getBlockchainHeight().toPromise()).compact();
  const namespaceHttp = new NamespaceHttp(endpoint);
  namespaceHttp.getNamespacesFromAccount(address).pipe(
    mergeMap((namespacesInfo) => {
      const namespaceIds = namespacesInfo.map((x) => {
        namespaces[x.id.toHex().toUpperCase()] = { namespaceInfo: x };
        return x.id;
      });
      return namespaceHttp.getNamespacesName(namespaceIds);
    }),
    map(namespacesNames => namespacesNames.map((namespaceName) => {
      const namespace = namespaces[namespaceName.namespaceId.toHex().toUpperCase()];
      namespace.namespaceName = namespaceName;
      return namespace;
    })),
  ).subscribe((namespacesInfo) => {
    resolve(formatNamespaces(namespacesInfo, blockHeight));
  },
  error => reject(error));
});
