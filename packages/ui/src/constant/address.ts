import { SupportChainIds } from './chains';

export const CounterAddress: { [key in SupportChainIds]: `0x${string}` } = {
  [SupportChainIds.LOCALHOST]: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
};
