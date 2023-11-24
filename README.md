# kyoko JS

## Setup

Install from npm:

`npm install @kyoko-finance/kyoko-js`

## Init
```ts
const kyokoJS = require("@kyoko-finance/kyoko-js");

const kyoko = kyokoJS.default;

(async () => {
    // 1. Dev
    await kyoko.init('JsonRpc', {url: 'http://localhost:8545/', privateKey: ''}, { chainId: 1 });
    // OR
    await kyoko.init('JsonRpc', {}, {}); // In this case JsonRpc url, privateKey, fee data and chainId will be specified automatically

    // 2. Infura
    await kyoko.init("Infura", { network: "homestead", apiKey: <INFURA_KEY> }, { chainId: 1 });
    
    // 3. Web3 provider
    await kyoko.init('Web3', { externalProvider: <WEB3_PROVIDER> }, { chainId: 1 });
    
    // get marketId
    const marketId = await kyoko.getMarketId();
    
    // get pool
    const kyokoPool = await kyoko.getKyokoPool();
})()
```
