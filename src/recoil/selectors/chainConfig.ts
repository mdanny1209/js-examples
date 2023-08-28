import { ChainConfiguration } from '@sei-js/react';
import { selector } from 'recoil';
import { customChainIdAtom, customRestUrlAtom, customRpcUrlAtom, selectedChainConfigAtom } from '../atoms';

export const selectedChainConfigSelector = selector<ChainConfiguration>({
	key: 'selectedChainConfigSelector',
	get: ({ get }) => {
		const selectedChainConfig = get(selectedChainConfigAtom);
		if (selectedChainConfig === 'testnet') {
			return {
				chainId: 'pacific-1',
				restUrl: 'https://sei-api.polkachu.com/',
				rpcUrl: 'https://sei-rpc.polkachu.com/'
			};
		} else if (selectedChainConfig === 'devnet') {
			return {
				chainId: 'pacific-1',
				restUrl: 'https://sei-api.polkachu.com/',
				rpcUrl: 'https://sei-rpc.polkachu.com/'
			};
		}

		// Get custom values
		const customChainId = get(customChainIdAtom);
		const customRestUrl = get(customRestUrlAtom);
		const customRpcUrl = get(customRpcUrlAtom);
		return {
			chainId: customChainId,
			restUrl: customRestUrl,
			rpcUrl: customRpcUrl
		};
	}
});
