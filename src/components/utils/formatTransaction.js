/* eslint-disable indent */

import {
 TransactionType, Address,
} from 'nem2-sdk';

const formatDate = (d) => {
 const date = d.getDate();
 const month = d.getMonth() + 1;
 const year = d.getFullYear();
 const hours = d.getHours();
 const minutes = d.getHours();

 return `${year.toString().substring(2)}/${month}/${date} ${hours}:${minutes}`;
};

const txTypeNameFromTypeId = (typeId) => {
 switch (typeId) {
     case TransactionType.TRANSFER: return 'Transfer';
     case TransactionType.REGISTER_NAMESPACE: return 'Register namespace';
     case TransactionType.ADDRESS_ALIAS: return 'Address alias';
     case TransactionType.MOSAIC_ALIAS: return 'Mosaic alias';
     case TransactionType.MOSAIC_DEFINITION: return 'Mosaic definition';
     case TransactionType.MOSAIC_SUPPLY_CHANGE: return 'Mosaic supply change';
     case TransactionType.MODIFY_MULTISIG_ACCOUNT: return 'Modify multisig account';
     case TransactionType.AGGREGATE_COMPLETE: return 'Aggregate complete';
     case TransactionType.AGGREGATE_BONDED: return 'Aggregate conded';
     case TransactionType.LOCK: return 'Lock';
     case TransactionType.SECRET_LOCK: return 'Secret lock';
     case TransactionType.SECRET_PROOF: return 'Secret proof';
     case TransactionType.MODIFY_ACCOUNT_PROPERTY_ADDRESS: return 'Modify account property address';
     case TransactionType.MODIFY_ACCOUNT_PROPERTY_MOSAIC: return 'Modify account property mosaic';
     case TransactionType.MODIFY_ACCOUNT_PROPERTY_ENTITY_TYPE: return 'Modify account property entity type';
     case TransactionType.LINK_ACCOUNT: return 'Link account';
     default: return new Error('The transaction ID was not found');
 }
};

const networkCurrencyIdToName = (id) => {
 switch (id) {
     case '77a1969932d987d7': return 'cat:currency';
     case '0651fba41c7d4e2f': return 'cat:harvest';
     default: return id;
 }
};


export const formatTransaction = (tx) => {
 const assetId = tx.mosaics && tx.mosaics[0] ? networkCurrencyIdToName(tx.mosaics[0].id.toHex()) : '';
 const amount = tx.mosaics && tx.mosaics[0] ? tx.mosaics[0].amount.compact() / 10e5 : 0;
 const recipient = tx.recipient ? new Address(tx.recipient.address).pretty() : '';
 const fee = 0;

 return {
     time: formatDate(new Date(tx.deadline.value)),
     signer: new Address(tx.signer.address.address).pretty(),
     recipient,
     amount,
     assetId,
     fee: `${fee}`,
     blockNumber: tx.transactionInfo.height.compact(),
     type: txTypeNameFromTypeId(tx.type),
     transactionHash: tx.transactionInfo.hash,
     id: tx.transactionInfo.id,
 };
};

export const removeDuplicatesAndSortByBlockNumber = (array) => {
    const noDuplicate = array.filter((item, index, self) => index === self.findIndex(t => (
        t.place === array.place && t.id === item.id
    )));
    return noDuplicate.sort((a, b) => b.blockNumber - a.blockNumber);
};
