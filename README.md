# aurajs-types

Typescript libraries for the Aura ecosystem. This repository was generated by Telescope, is a TypeScript Transpiler for SmartContract/Aura/Cosmos/IBC Protobufs. This tool is used to generate libraries for Cosmos blockchains. Simply, you can import aurajs to interact with Aura node.
Provide all typescript types which be converted from protobuf in these modules, all rpc/lcd client for interacting
Developers could add more modules for aurajs by adding more submodules then codegen. If you want new tx interact, you also must register its types to client's registry

### Query

```sh
const tendermintClient = await Tendermint34Client.connect(rpcEndpoint);
# The generic Stargate query client knows how to use the Tendermint client to submit unverified ABCI queries
const queryClient = new QueryClient(tendermintClient);
# This helper function wraps the generic Stargate query client for use by the specific generated query client
const rpcClient = createProtobufRpcClient(queryClient);
# Here we instantiate a specific query client which will have the custom methods defined in the .proto file
const queryService = new QueryClientImpl(rpcClient);
# Now you can use this service to submit queries
const queryResult = await queryService.Balance({
    address: 'aura1ucp33srru7g45ku6w207kc4hy6xd6psvq5le7h',
    denom: 'ueaura'
});
```

### Tx

```sh
const client = await getClient()
const myAddress = "aura1yges2jkc7gnpgejzkq8jag3m87vqtmnpm979ll";
const message = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: MsgSend.fromPartial({
        fromAddress: 'aura1yges2jkc7gnpgejzkq8jag3m87vqtmnpm979ll',
        toAddress: 'aura1yff0ajuunnvejwkjktp38p8fhya9d6e72uh8rm',
        amount: [{
            denom: 'ueaura',
            amount: "200"
        }]
    }),
};
const fee = {
    amount: [
        {
            denom: "ueaura", // Use the appropriate fee denom for your chain
            amount: "200",
        },
    ],
    gas: "100000",
};
const response = await client.signAndBroadcast(myAddress, [message], fee);
```
