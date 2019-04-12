import { Address } from 'nem2-sdk';

// eslint-disable-next-line import/prefer-default-export
export const formatAccountInfo = ai => ({
  address: ai.address.address,
  addressPretty: new Address(ai.address.address).pretty(),
  publicKey: ai.publicKey,
});
