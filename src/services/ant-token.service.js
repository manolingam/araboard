import { ANT_ADDR_MAINNET, ANT_ANJ_TOKEN_CONTRACT_ABI, NETWORK_RESERVE_ADDR } from '../hooks/contracts.util';
import BigNumber from 'bignumber.js';

const Web3EthContract = require('web3-eth-contract');

export class AntTokenService {
  constructor() {
    this.AntTokenContract = new Web3EthContract(ANT_ANJ_TOKEN_CONTRACT_ABI, ANT_ADDR_MAINNET);
    this._decimals = null;
    this._balanceOf = new Map();
  }

  async decimals() {
    if (this._decimals) {
      return this._decimals;
    } else {
      const decimals = await this.AntTokenContract.methods.decimals().call();
      this._decimals = Number(decimals);
      return this._decimals;
    }
  }

  async balanceOf(address) {
    const found = this._balanceOf.get(address);
    if (found) {
      return found;
    } else {
      const balanceOf = await this.AntTokenContract.methods.balanceOf(address).call();
      const balanceOfBigNum = new BigNumber(balanceOf);
      this._balanceOf.set(address, balanceOfBigNum);
      return balanceOfBigNum;
    }
  }

  async balanceOfNumber(address) {
    const balanceOf = await this.balanceOf(address);
    const decimals = await this.decimals();
    return balanceOf.div(10 ** decimals).toNumber();
  }
}
