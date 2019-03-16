/* eslint-disable class-methods-use-this */
class StateRepository {
  constructor() {
    this.state = {
      wallets: [],
    };
  }

  wallets() {
    return this.state.wallets;
  }

  storeWallet(walletName, account, node) {
    this.state.wallets.push({ name: walletName, account, node });
  }
}

const stateRepository = new StateRepository();

export default stateRepository;
