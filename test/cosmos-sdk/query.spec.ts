import { BeforeAll, Describe, Test } from '@jest-decorated/core';
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryClientImpl } from '../../src/cosmos/bank/v1beta1/query';
const rpcEndpoint = "https://rpc.euphoria.aura.network"

@Describe('Test query')
export default class Query {

    @Test('Query bank balance')
    public async BankBalance() {
        const tendermintClient = await Tendermint34Client.connect(rpcEndpoint);

        // The generic Stargate query client knows how to use the Tendermint client to submit unverified ABCI queries
        const queryClient = new QueryClient(tendermintClient);

        // This helper function wraps the generic Stargate query client for use by the specific generated query client
        const rpcClient = createProtobufRpcClient(queryClient);

        // Here we instantiate a specific query client which will have the custom methods defined in the .proto file
        const queryService = new QueryClientImpl(rpcClient);

        // Now you can use this service to submit queries
        const queryResult = await queryService.Balance({
            address: 'aura1ucp33srru7g45ku6w207kc4hy6xd6psvq5le7h',
            denom: 'ueaura'
        });
        console.log(queryResult);
    }
}

