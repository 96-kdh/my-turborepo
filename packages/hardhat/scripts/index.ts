import { network } from 'hardhat';
import { SupportChainIds } from '../index';

(async function main() {
  const chainId = network.config.chainId as SupportChainIds;
  // console.log(chainId);
  if (chainId === SupportChainIds.HARDHAT) {
    await network.provider.send('evm_setIntervalMining', [1000]);
  }
  // console.log(await network.provider.send('eth_blockNumber'));
  // await network.provider.send('evm_mine');
  // console.log(await network.provider.send('eth_blockNumber'));
})();
