import { Interface, Contract, ethers, InterfaceAbi } from 'ethers';

export default abstract class SafeCallContract {
  protected address: `0x${string}`;
  protected contract: Contract;

  private retryLimit: number; // Number of retries before giving up
  private readonly providers: string[];

  protected constructor(providers: string[], contractObj: { baseAddress: `0x${string}`; baseABI: InterfaceAbi }) {
    this.address = contractObj.baseAddress;

    const iface = new Interface(contractObj.baseABI);
    const jsonProvider = new ethers.JsonRpcProvider(providers[0]);
    this.contract = new Contract(contractObj.baseAddress, iface.format(), jsonProvider);

    this.retryLimit = providers.length;
    this.providers = providers;
  }

  protected safeCall<T extends any[], R>(
    call: (...args: T) => Promise<R>,
    retries: number = this.retryLimit
  ): (...args: T) => Promise<R> {
    return async (...args: T): Promise<R> => {
      try {
        return await call(...args);
      } catch (e) {
        if (retries > 0) {
          console.error(e);
          console.log(`Retries left: ${retries - 1}`);
          console.error('arg: ', JSON.stringify(args), 'calls: ', JSON.stringify(call));

          const jsonProvider = new ethers.JsonRpcProvider(this.providers[this.providers.length - retries]);
          this.contract = new Contract(this.address, this.contract.interface.format(), jsonProvider);

          return this.safeCall(call, retries - 1)(...args);
        }
        throw new Error('Operation failed after maximum retries');
      }
    };
  }
}
