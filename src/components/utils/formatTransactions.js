/* eslint-disable indent */

import {
 TransactionType, Address, UInt64,
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

const getBody = (tx) => {
    // Set the body keypairs in UI display order
    switch (tx.type) {
        case TransactionType.TRANSFER:
            return [];

        case TransactionType.REGISTER_NAMESPACE:
        return [
            { key: 'Namespace Name', value: tx.namespaceName },
            { key: 'Duration (blocks)', value: typeof tx.duration === 'undefined' ? 'unlimited' : tx.duration.compact().toLocaleString() },
            { key: 'Parent Namespace', value: tx.parentNamespace ? tx.parentNamespace : false },
        ];

        case TransactionType.ADDRESS_ALIAS: return [
            {
                key: 'Alias action type',
                value: tx.actionType === 0 ? 'Link' : 'Unlink',
            },
            { key: 'Address', value: new Address(tx.address).pretty() },
            {
                key: 'Namespace Id',
                value: new UInt64(tx.namespaceId).toHex().toUpperCase(),
            },
        ];

        case TransactionType.MOSAIC_ALIAS:
        return [
            {
                key: 'Alias action type',
                value: tx.actionType === 0 ? 'Link' : 'Unlink',
            },
            { key: 'Mosaic Id', value: new UInt64(tx.mosaicId).toHex().toUpperCase() },
            {
                key: 'Namespace Id',
                value: new UInt64(tx.namespaceId).toHex().toUpperCase(),
            },
        ];

        case TransactionType.MOSAIC_DEFINITION:
        return [
            { key: 'Mosaic Id', value: tx.mosaicId.toHex() },
            {
                key: 'Divisibility (decimals)',
                value: tx.mosaicProperties.divisibility,
            },
            {
                key: 'Duration (blocks)',
                value: tx.mosaicProperties.duration.compact().toLocaleString(),
            },
            {
                key: 'Levy mutable',
                value: tx.mosaicProperties.levyMutable,
            },
            {
                key: 'Supply mutable',
                value: tx.mosaicProperties.supplyMutable,
            },
            {
                key: 'Transferable',
                value: tx.mosaicProperties.transferable,
            },
        ];

        case TransactionType.MOSAIC_SUPPLY_CHANGE: return [
            { key: 'Mosaic Id', value: tx.mosaicId.toHex() },
            {
                key: 'Direction',
                value: tx.direction === 0 ? 'Decrease' : 'Increase',
            },
            {
                key: 'Delta',
                value: tx.delta.compact().toLocaleString(),
            },
        ];

        case TransactionType.MODIFY_MULTISIG_ACCOUNT: return [
            { key: 'Min. approval delta', value: tx.minApprovalDelta },
            { key: 'Min. removal delta', value: tx.minRemovalDelta },
            // notifications
        ];

        case TransactionType.AGGREGATE_COMPLETE: return [];

        case TransactionType.AGGREGATE_BONDED: return [];

        case TransactionType.LOCK: return [
            { key: 'Locked asset Id', value: tx.mosaic.id.toHex() },
            {
                key: 'Duration (blocks)',
                value: tx.duration.compact().toLocaleString(),
            },
        ];

        case TransactionType.SECRET_LOCK: return [
            { key: 'Locked amount', value: tx.mosaic.amount.compact().toLocaleString() },
            { key: 'Locked asset Id', value: tx.mosaic.id.toHex() },
            {
                key: 'Duration (blocks)',
                value: tx.duration.compact(),
            },
            { key: 'Recipient', value: new Address(tx.recipient.address).pretty() },
            { key: 'Secret', value: tx.secret },
        ];

        case TransactionType.SECRET_PROOF:
        return [
            { key: 'Secret', value: tx.secret },
            { key: 'Proof', value: tx.proof },
        ];

        // @TODO
        case TransactionType.MODIFY_ACCOUNT_PROPERTY_ADDRESS: return [];

        // @TODO
        case TransactionType.MODIFY_ACCOUNT_PROPERTY_MOSAIC: return [];

        // @TODO
        case TransactionType.MODIFY_ACCOUNT_PROPERTY_ENTITY_TYPE: return [];

        case TransactionType.LINK_ACCOUNT: return [
            { key: 'Remote account key', value: tx.remoteAccountKey },
            { key: 'Link action', value: tx.mosaic.amount.compact() },
        ];
        default: return [];
    }
};

const formatTransaction = (tx) => {
 const assetId = tx.mosaics && tx.mosaics[0] ? networkCurrencyIdToName(tx.mosaics[0].id.toHex()) : '';
 const amount = tx.mosaics && tx.mosaics[0] ? tx.mosaics[0].amount.compact() / 10e5 : 0;
 const recipient = tx.recipient ? new Address(tx.recipient.address).pretty() : '';
 const type = tx.aggregate ? `${txTypeNameFromTypeId(tx.type)} [${tx.aggregate}]` : txTypeNameFromTypeId(tx.type);
 const fee = tx.fee.compact();
 // @TODO: handle max fees
 const maxFee = '0';
 const body = getBody(tx);

 return {
     time: formatDate(new Date(tx.deadline.value)),
     signer: new Address(tx.signer.address.address).pretty(),
     recipient,
     amount,
     assetId,
     fee: `${fee}`,
     maxFee,
     blockNumber: tx.transactionInfo.height.compact(),
     type,
     transactionHash: tx.transactionInfo.hash,
     id: tx.transactionInfo.id,
     body,
 };
};

export const formatTransactions = (tx) => {
    if (tx.innerTransactions) {
        return tx.innerTransactions.map((t) => {
            // eslint-disable-next-line no-param-reassign
            t.transactionInfo.hash = tx.transactionInfo.hash;
            // eslint-disable-next-line no-param-reassign
            t.aggregate = txTypeNameFromTypeId(tx.type);
            return formatTransaction(t);
        });
    }
    return [formatTransaction(tx)];
};

export const removeDuplicatesAndSortByBlockNumber = (array) => {
    const noDuplicate = array.filter((item, index, self) => index === self.findIndex(t => (
        t.place === array.place && t.id === item.id
    )));
    return noDuplicate.sort((a, b) => b.blockNumber - a.blockNumber);
};
