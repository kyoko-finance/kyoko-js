import { ethers, Networkish } from "ethers";

import { kyoko as _kyoko } from "./kyoko";

async function init (
    providerType: 'JsonRpc' | 'Web3' | 'Infura' | 'Alchemy',
    providerSettings: { url?: string, privateKey?: string, batchMaxCount? : number } | { externalProvider: ethers.Eip1193Provider } | { network?: Networkish, apiKey?: string },
) {
    await _kyoko.init(providerType, providerSettings);
    // @ts-ignore
    this.signerAddress = _kyoko.signerAddress;
    // @ts-ignore
    this.chainId = _kyoko.chainId;

    // @ts-ignore
    this.contracts = _kyoko.contracts;

    // @ts-ignore
    this.provider = _kyoko.provider;

    // @ts-ignore
    this.signer = _kyoko.signer
}

const kyoko = {
    init,
    chainId: 0,
    signerAddress: '',
    getMarketId: _kyoko.getMarketId,
    getKyokoPool: _kyoko.getKyokoPool,
    getKyokoPoolLiquidator: _kyoko.getKyokoPoolLiquidator,
    getKyokoPoolConfigurator: _kyoko.getKyokoPoolConfigurator,
    getKyokoPoolFactory: _kyoko.getKyokoPoolFactory,
    getPoolAdmin: _kyoko.getPoolAdmin,
    getEmergencyAdmin: _kyoko.getEmergencyAdmin,
    getPriceOracle: _kyoko.getPriceOracle,
    getRateStrategy: _kyoko.getRateStrategy
};

export default kyoko;

