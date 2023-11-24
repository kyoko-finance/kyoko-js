import { ethers, Networkish } from 'ethers';

import KyokoPoolAddressProviderAbi from './abi/KyokoPoolAddressProvider/abi';

const GoerliKyokoPoolAddressProviderAddress = '0xC1606c7c16753B61c6a3a5c84350EcaE68CD216c';
const MainnetKyokoPoolAddressProviderAddress = '0x533D4df07E232C9914916573c07e4030f2Ba7A0D';

class Kyoko {
    provider: ethers.BrowserProvider | ethers.JsonRpcProvider;
    signer: ethers.Signer | null;
    chainId: number;
    signerAddress: string;
    contracts: Record<string, any>;

    constructor() {
        // @ts-ignore
        this.provider = null;
        // @ts-ignore
        this.signer = null;
        this.signerAddress = '';
        this.chainId = 1;
        this.contracts = {};
    }

    async init(
        providerType: 'JsonRpc' | 'Web3' | 'Infura' | 'Alchemy',
        providerSettings: { url?: string, privateKey?: string, batchMaxCount? : number } | { externalProvider: ethers.Eip1193Provider } | { network?: Networkish, apiKey?: string },
    ) {
        // @ts-ignore
        this.provider = null;
        this.signer = null;
        this.signerAddress = '';
        this.chainId = 1;
        this.contracts = {};

        if (providerType.toLowerCase() === 'JsonRpc'.toLowerCase()) {
            providerSettings = providerSettings as { url: string, privateKey: string, batchMaxCount? : number };

            let jsonRpcApiProviderOptions;
            if ( providerSettings.batchMaxCount ) {
                jsonRpcApiProviderOptions = {
                    batchMaxCount: providerSettings.batchMaxCount,
                };
            }

            if (providerSettings.url) {
                this.provider = new ethers.JsonRpcProvider(providerSettings.url, undefined, jsonRpcApiProviderOptions);
            } else {
                this.provider = new ethers.JsonRpcProvider('http://localhost:8545/', undefined, jsonRpcApiProviderOptions);
            }

            if (providerSettings.privateKey) {
                this.signer = new ethers.Wallet(providerSettings.privateKey, this.provider);
            } else if (!providerSettings.url?.startsWith("https://rpc.gnosischain.com")) {
                try {
                    this.signer = await this.provider.getSigner();
                } catch (e) {
                    this.signer = null;
                }
            }
            // Web3 provider
        } else if (providerType.toLowerCase() === 'Web3'.toLowerCase()) {
            providerSettings = providerSettings as { externalProvider: ethers.Eip1193Provider };
            this.provider = new ethers.BrowserProvider(providerSettings.externalProvider);
            this.signer = await this.provider.getSigner();
            // Infura provider
        } else if (providerType.toLowerCase() === 'Infura'.toLowerCase()) {
            providerSettings = providerSettings as { network?: Networkish, apiKey?: string };
            this.provider = new ethers.InfuraProvider(providerSettings.network, providerSettings.apiKey);
            this.signer = null;
            // Alchemy provider
        } else if (providerType.toLowerCase() === 'Alchemy'.toLowerCase()) {
            providerSettings = providerSettings as { network?: Networkish, apiKey?: string };
            this.provider = new ethers.AlchemyProvider(providerSettings.network, providerSettings.apiKey);
            this.signer = null;
        } else {
            throw Error('Wrong providerType');
        }

        const network = await this.provider.getNetwork();
        this.chainId = Number(network.chainId);

        if (this.signer) {
            try {
                this.signerAddress = await this.signer.getAddress();
            } catch {
                console.log('KYOKO-JS get signer address failed.');
                this.signer = null;
            }
        } else {
            this.signerAddress = '';
        }

        const addr = this.chainId === 1 ? MainnetKyokoPoolAddressProviderAddress : GoerliKyokoPoolAddressProviderAddress;
        
        this.initContract(addr, KyokoPoolAddressProviderAbi);
    }

    initContract(address: string, abi: any) {
        this.contracts[address] = new ethers.Contract(address, abi, this.signer || this.provider);
    }

    async getMarketId(): Promise<string> {
        const addr = this.chainId === 1 ? MainnetKyokoPoolAddressProviderAddress : GoerliKyokoPoolAddressProviderAddress;
        const contract = this.contracts[addr];

        const marketId = await contract.getMarketId();

        return marketId;
    }

    async getKyokoPool(): Promise<Array<string>> {
        const addr = this.chainId === 1 ? MainnetKyokoPoolAddressProviderAddress : GoerliKyokoPoolAddressProviderAddress;
        const contract = this.contracts[addr];

        const kyokoPool = await contract.getKyokoPool();

        return kyokoPool;
    }

    async getKyokoPoolLiquidator(): Promise<Array<string>> {
        const addr = this.chainId === 1 ? MainnetKyokoPoolAddressProviderAddress : GoerliKyokoPoolAddressProviderAddress;
        const contract = this.contracts[addr];

        const kyokoPoolLiquidator = await contract.getKyokoPoolLiquidator();

        return kyokoPoolLiquidator;
    }

    async getKyokoPoolConfigurator(): Promise<Array<string>> {
        const addr = this.chainId === 1 ? MainnetKyokoPoolAddressProviderAddress : GoerliKyokoPoolAddressProviderAddress;
        const contract = this.contracts[addr];

        const kyokoPoolConfigurator = await contract.getKyokoPoolConfigurator();

        return kyokoPoolConfigurator;
    }

    async getKyokoPoolFactory(): Promise<Array<string>> {
        const addr = this.chainId === 1 ? MainnetKyokoPoolAddressProviderAddress : GoerliKyokoPoolAddressProviderAddress;
        const contract = this.contracts[addr];

        const kyokoPoolFactory = await contract.getKyokoPoolFactory();

        return kyokoPoolFactory;
    }

    async getPoolAdmin(): Promise<Array<string>> {
        const addr = this.chainId === 1 ? MainnetKyokoPoolAddressProviderAddress : GoerliKyokoPoolAddressProviderAddress;
        const contract = this.contracts[addr];

        const poolAdmin = await contract.getPoolAdmin();

        return poolAdmin;
    }

    async getEmergencyAdmin(): Promise<Array<string>> {
        const addr = this.chainId === 1 ? MainnetKyokoPoolAddressProviderAddress : GoerliKyokoPoolAddressProviderAddress;
        const contract = this.contracts[addr];

        const emergencyAdmin = await contract.getEmergencyAdmin();

        return emergencyAdmin;
    }

    async getPriceOracle(): Promise<Array<string>> {
        const addr = this.chainId === 1 ? MainnetKyokoPoolAddressProviderAddress : GoerliKyokoPoolAddressProviderAddress;
        const contract = this.contracts[addr];

        const priceOracle = await contract.getPriceOracle();

        return priceOracle;
    }

    async getRateStrategy(): Promise<Array<string>> {
        const addr = this.chainId === 1 ? MainnetKyokoPoolAddressProviderAddress : GoerliKyokoPoolAddressProviderAddress;
        const contract = this.contracts[addr];

        const rateStrategy = await contract.getRateStrategy();

        return rateStrategy;
    }
}

export const kyoko = new Kyoko();
