/* eslint-disable indent */

import {
 TransactionType, Address,
} from 'nem2-sdk';

import { networkCurrencyIdToName } from './nerworkCurrencyToName';

 const formatDate = (d) => {
 const date = d.getDate();
 const month = d.getMonth() + 1;
 const year = d.getFullYear();
 const hours = d.getHours();
 const minutes = d.getMinutes();

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
     case TransactionType.AGGREGATE_BONDED: return 'Aggregate bonded';
     case TransactionType.LOCK: return 'Lock';
     case TransactionType.SECRET_LOCK: return 'Secret lock';
     case TransactionType.SECRET_PROOF: return 'Secret proof';
     case TransactionType.MODIFY_ACCOUNT_PROPERTY_ADDRESS: return 'Mod. account address';
     case TransactionType.MODIFY_ACCOUNT_PROPERTY_MOSAIC: return 'Mod. account mosaic';
     case TransactionType.MODIFY_ACCOUNT_PROPERTY_ENTITY_TYPE: return 'Mod. account entity type';
     case TransactionType.LINK_ACCOUNT: return 'Link account';
     default: return new Error('The transaction ID was not found');
 }
};

const getBody = (tx) => {
    // The body items will be displayed iteratively as the keys depend on the transaction type
    // The key order will dictate the display order
    const body = [];

    // mainProp1, mainProp2, and type1 are fixed fields that display in the transaction rows
    let mainProp1 = '';
    let mainProp2 = '';

    switch (tx.type) {
        case TransactionType.TRANSFER:
            if (tx.message) body.push({ key: 'Message', value: tx.message.payload });

            if (tx.mosaics.length > 0) {
                let int = 0;
                tx.mosaics.forEach((mosaic) => {
                    int += 1;
                    body.push(
                        { key: `Amount ${int}`, value: mosaic.amount.compact().toLocaleString() },
                        {
                            key: `Asset ID ${int}`,
                            value: networkCurrencyIdToName(mosaic.id.toHex()),
                        },
                    );
                });
            }

            mainProp1 = tx.mosaics.length === 1
                ? networkCurrencyIdToName(tx.mosaics[0].id.toHex())
                : '';

            mainProp2 = tx.mosaics.length === 1
                ? tx.mosaics[0].amount.compact().toLocaleString()
                : 'multi';
            break;

        case TransactionType.REGISTER_NAMESPACE:
            // eslint-disable-next-line no-case-declarations

            switch (tx.namespaceType) {
                case 1:
                    // This is a child namespace
                    body.push(
                        { key: 'Namespace Name', value: tx.namespaceName },
                        { key: 'Duration (blocks)', value: 0 },
                        { key: 'Parent Namespace Id', value: tx.parentId.toHex().toUpperCase() },
                    );
                    mainProp1 = `Child of ${tx.parentId.toHex().toUpperCase()}`;
                    break;

                default:
                    // This is a root-level namespace
                    body.push(
                        { key: 'Namespace Name', value: tx.namespaceName },
                        { key: 'Duration (blocks)', value: tx.duration.compact().toLocaleString() },
                    );
                    mainProp1 = '';
                    break;
            }

            mainProp2 = tx.namespaceName;
            break;

        case TransactionType.ADDRESS_ALIAS:
            body.push(
                {
                    key: 'Alias action type',
                    value: tx.actionType === 0 ? 'Link' : 'Unlink',
                },
                { key: 'Address', value: new Address(tx.address.address).pretty() },
                {
                    key: 'Namespace Id',
                    value: tx.namespaceId.toHex().toUpperCase(),
                },
            );

            mainProp1 = tx.actionType === 0 ? 'Link' : 'Unlink';
            mainProp2 = tx.namespaceId.toHex().toUpperCase();
            break;

        case TransactionType.MOSAIC_ALIAS:
            body.push(
                {
                    key: 'Alias action type',
                    value: tx.actionType === 0 ? 'Link' : 'Unlink',
                },
                { key: 'Mosaic Id', value: tx.mosaicId.toHex().toUpperCase() },
                {
                    key: 'Namespace Id',
                    value: tx.namespaceId.toHex().toUpperCase(),
                },
            );

            mainProp1 = '';
            mainProp2 = tx.namespaceId.toHex().toUpperCase();
            break;

        case TransactionType.MOSAIC_DEFINITION:
            body.push(
                { key: 'Mosaic Id', value: tx.mosaicId.toHex().toUpperCase() },
                {
                    key: 'Divisibility (decimals)',
                    value: tx.mosaicProperties.divisibility,
                },
                {
                    key: 'Duration (blocks)',
                    value: tx.mosaicProperties.duration.compact() === 0
                        ? 'unlimited'
                        : tx.mosaicProperties.duration.compact().toLocaleString(),
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
            );
 
            mainProp1 = '';
            mainProp2 = tx.mosaicId.toHex().toUpperCase();
            break;

        case TransactionType.MOSAIC_SUPPLY_CHANGE:
            body.push(
                { key: 'Mosaic Id', value: tx.mosaicId.toHex().toUpperCase() },
                {
                    key: 'Direction',
                    value: tx.direction === 0 ? 'Decrease' : 'Increase',
                },
                {
                    key: 'Delta',
                    value: tx.delta.compact().toLocaleString(),
                },
            );
            
            mainProp1 = tx.direction === 0 
                ? `Decreased by ${tx.delta.compact().toLocaleString()}`
                : `Increased by ${tx.delta.compact().toLocaleString()}`;
            mainProp2 = tx.mosaicId.toHex().toUpperCase();
            break;

        case TransactionType.MODIFY_MULTISIG_ACCOUNT:
            body.push(
                { key: 'Min. approval delta', value: tx.minApprovalDelta },
                { key: 'Min. removal delta', value: tx.minRemovalDelta },
                // notifications
            );

            mainProp1 = tx.minApprovalDelta;
            mainProp2 = tx.minRemovalDelta;
            break;

        // The aggregate types shall be unreachable.
        // I let them here for consistency with the SDK type definition file
        case TransactionType.AGGREGATE_COMPLETE: break;
        case TransactionType.AGGREGATE_BONDED: break;

        case TransactionType.LOCK:
            body.push(
                { key: 'Locked amount', value: tx.mosaic.amount.compact().toLocaleString() },
                { key: 'Locked asset Id', value: tx.mosaic.id.toHex() },
                {
                    key: 'Duration (blocks)',
                    value: tx.duration.compact().toLocaleString(),
                },
            );

            mainProp1 = tx.mosaic.amount.compact().toLocaleString();
            mainProp2 = tx.mosaic.id.toHex().toUpperCase();
            break;

        case TransactionType.SECRET_LOCK:
            body.push(
                { key: 'Locked amount', value: tx.mosaic.amount.compact().toLocaleString() },
                { key: 'Locked asset Id', value: tx.mosaic.id.toHex() },
                {
                    key: 'Duration (blocks)',
                    value: tx.duration.compact(),
                },
                { key: 'Recipient', value: new Address(tx.recipient.address).pretty() },
                { key: 'Secret', value: tx.secret },
            );

            mainProp1 = tx.mosaic.amount.compact().toLocaleString();
            mainProp2 = tx.mosaic.id.toHex().toUpperCase();
            break;

        case TransactionType.SECRET_PROOF:
            body.push(
                { key: 'Secret', value: tx.secret },
                { key: 'Proof', value: tx.proof },
            );

            mainProp1 = '';
            mainProp2 = '';
            break;

        // @TODO
        case TransactionType.MODIFY_ACCOUNT_PROPERTY_ADDRESS:
            mainProp1 = '';
            mainProp2 = '';
            break;

        // @TODO
        case TransactionType.MODIFY_ACCOUNT_PROPERTY_MOSAIC:
            mainProp1 = '';
            mainProp2 = '';
            break;

        // @TODO
        case TransactionType.MODIFY_ACCOUNT_PROPERTY_ENTITY_TYPE:
            mainProp1 = '';
            mainProp2 = '';
            break;

        case TransactionType.LINK_ACCOUNT:
            body.push(
                { key: 'Remote account key', value: tx.remoteAccountKey },
                { key: 'Link action', value: tx.actionType === 0 ? 'Link' : 'Unlink' },
            );

            mainProp1 = '';
            mainProp2 = '';
            break;

        default: break;
    }

    const headerExtension = {
        type1: txTypeNameFromTypeId(tx.type),
        mainProp1,
        mainProp2,
    };

    return { body, headerExtension };
};

const formatTransaction = (tx) => {
    const recipient = tx.recipient ? new Address(tx.recipient.address).pretty() : '';
    const type2 = tx.aggregate ? tx.aggregate : '';
    const specificTransactionItems = getBody(tx);

    return {
        time: formatDate(new Date(tx.deadline.value)),
        signer: new Address(tx.signer.address.address).pretty(),
        recipient,
        fee: tx.maxFee.compact(),
        blockNumber: tx.transactionInfo.height.compact(),
        type2,
        transactionHash: tx.transactionInfo.hash,
        id: tx.transactionInfo.id,
        body: specificTransactionItems.body,
        type1: specificTransactionItems.headerExtension.type1,
        mainProp1: specificTransactionItems.headerExtension.mainProp1,
        mainProp2: specificTransactionItems.headerExtension.mainProp2,
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
