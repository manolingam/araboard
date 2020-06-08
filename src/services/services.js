import { EthereumService } from './ethereum.service';
import { CoingeckoService } from './coingecko.service';
import { AntTokenService } from './ant-token.service';
import { AntParticipantsService } from './ant-participants.service';
import { AntPriceService } from './ant-price.service';
import { AnjSupplyService } from './anj-supply.service';
import { AnjPriceService } from './anj-price.service';
import { AntTreasuryService } from './ant-treasury.service';

export class Services {
  constructor() {
    this.ethereum = new EthereumService();
    this.coingecko = new CoingeckoService();
    this.antToken = new AntTokenService();
    this.antParticipants = new AntParticipantsService();
    this.antPrice = new AntPriceService();
    this.anjSupply = new AnjSupplyService(this.ethereum);
    this.anjPrice = new AnjPriceService(this.anjSupply, this.antPrice);
    this.antTreasury = new AntTreasuryService(this.ethereum, this.antPrice, this.anjPrice);
  }
}
