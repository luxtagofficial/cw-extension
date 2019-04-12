/* eslint-disable max-len */
import {
  UInt64, Address, AliasActionType,
} from 'nem2-sdk';

// eslint-disable-next-line import/prefer-default-export
export const formatNamespaces = (namespacesInfo, blockHeight) => namespacesInfo.filter((ns, index, namespaces) => {
  for (let i = 0; i < index; i += 1) {
    if (ns === namespaces[i]) return false;
  }
  return true;
}).sort((a, b) => {
  const nameA = a.namespaceInfo.metaId;
  const nameB = b.namespaceInfo.metaId;
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}).map((ns, index, original) => {
  const name = ns.namespaceInfo.levels.map(level => original.find(n => n.namespaceInfo.id.equals(level))).map(n => n.namespaceName.name).join('.');
  let aliasText;
  let aliasType;
  switch (ns.namespaceInfo.alias.type) {
    case 1:
      aliasText = (new UInt64(ns.namespaceInfo.alias.mosaicId)).toHex().toUpperCase();
      aliasType = 'mosaic alias:';
      break;
    case 2:
      aliasText = Address.createFromEncoded(ns.namespaceInfo.alias.address).pretty();
      aliasType = 'address alias:';
      break;
    default:
      aliasText = '';
      aliasType = 'no alias';
      break;
  }
  const expireWithin = ns.namespaceInfo.endHeight.compact() - blockHeight;
  const expireText = expireWithin > 0 ? `expire within ${expireWithin.toLocaleString()} blocks` : `expired ${(-expireWithin).toLocaleString()} blocks ago`;
  return {
    name,
    hexId: ns.namespaceInfo.id.toHex().toUpperCase(),
    type: aliasType,
    alias: aliasText,
    expire: expireText,
    expand: {
      isExpandMore: false,
      namespaceName: name,
      aliasActionType:
          ns.namespaceInfo.alias.type === 0 ? AliasActionType.Link : AliasActionType.Unlink,
      currentAliasType: ns.namespaceInfo.alias.type,
      currentAlias: ns.namespaceInfo.alias.type === 0 ? '' : aliasText,
    },
  };
});
