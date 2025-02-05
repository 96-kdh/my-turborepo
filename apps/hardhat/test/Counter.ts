import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe('Counter', function () {
  async function deployCounterFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const counter = await hre.viem.deployContract('Counter');
    const publicClient = await hre.viem.getPublicClient();

    return {
      counter,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe('Deployment', function () {
    it('Should initial count is zero', async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      const abs = await counter.read.readCount();

      expect(await counter.read.readCount()).to.equal(0n);
    });

    it('Should upCount & readCount is one', async function () {
      const { counter, publicClient } = await loadFixture(deployCounterFixture);

      const hash = await counter.write.upCount();
      await publicClient.waitForTransactionReceipt({ hash });

      expect(await counter.read.readCount()).to.equal(1n);
    });

    it('Should fail writeCount', async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await expect(counter.write.writeCount([0n])).to.be.rejectedWith();
    });
  });
});
