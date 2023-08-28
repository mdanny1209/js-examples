import { SeiWalletProvider } from '@sei-js/react';
import { useRecoilValue } from 'recoil';

import { ChainInfo, AccountInfo, SendTokens } from './components';
import { selectedChainConfigSelector } from './recoil';
import './common.css';

const SeiExample = () => {
	const selectedChainConfigUrls = useRecoilValue(selectedChainConfigSelector);

	return (
		<SeiWalletProvider chainConfiguration={selectedChainConfigUrls}>
			<div className='app'>
				<div className='appHeader'>
					<h2>OIN TESTNET PARTICIPATION CLAIM</h2>
				</div>
				<div className='appContent'>
					<ChainInfo />
					<AccountInfo />
				</div>
				<SendTokens />
			</div>
		</SeiWalletProvider>
	);
};

export default SeiExample;
