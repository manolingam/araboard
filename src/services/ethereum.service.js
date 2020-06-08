import Web3 from 'web3';
const Web3EthContract = require('web3-eth-contract');

export class EthereumService {
  constructor() {
    this.provider = new Web3.providers.WebsocketProvider('wss://mainnet.eth.aragon.network/ws');
    Web3EthContract.setProvider(this.provider);
    this.web3 = new Web3(this.provider);
    this._lastBlockNumber = null;
  }

  async getLastBlockNumber() {
    if (this._lastBlockNumber) {
      return this._lastBlockNumber;
    } else {
      const blockNumber = await this.web3.eth.getBlockNumber();
      this._lastBlockNumber = blockNumber - 100;
      return this._lastBlockNumber;
    }
  }
}
