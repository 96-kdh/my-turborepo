import hre, { network } from 'hardhat';
import { SupportChainIds } from '@repo/ui/constant';

(async function main() {
  const chainId = network.config.chainId as SupportChainIds;
  console.log(chainId);
  if (chainId === SupportChainIds.LOCALHOST) {
    await network.provider.send('evm_setIntervalMining', [1000]);
  }
  const counter = await hre.viem.deployContract('Counter');
  console.log('address: ', counter.address);
  console.log(await network.provider.send('eth_blockNumber'));
  await network.provider.send('evm_mine');
  console.log(await network.provider.send('eth_blockNumber'));
})();
