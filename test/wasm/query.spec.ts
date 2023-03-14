import { Describe, Test } from '@jest-decorated/core';
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { fromHex } from "@cosmjs/encoding";
import { QueryClientImpl } from '../../src/cosmwasm/wasm/v1/query';
import Long from 'long';
const rpcEndpoint = "https://rpc.euphoria.aura.network"

@Describe('Test query wasm')
export default class Query {

    @Test('Query code info')
    public async CodeInfo() {
        const tendermintClient = await Tendermint34Client.connect(rpcEndpoint);

        // The generic Stargate query client knows how to use the Tendermint client to submit unverified ABCI queries
        const queryClient = new QueryClient(tendermintClient);

        // This helper function wraps the generic Stargate query client for use by the specific generated query client
        const rpcClient = createProtobufRpcClient(queryClient);

        // Here we instantiate a specific query client which will have the custom methods defined in the .proto file
        const queryService = new QueryClientImpl(rpcClient);

        // Now you can use this service to submit queries
        const queryResult = await queryService.Code({
            codeId: new Long(547, 0)
        });
        expect(queryResult.codeInfo?.codeId.toString()).toBe('547')
        expect(queryResult.codeInfo?.creator).toBe('aura12yxrag2d4e7lt6s6y5x59amhvehx52f7t2frjm')
        expect(queryResult.codeInfo?.dataHash).toEqual(fromHex("1D72D4075E3453287403A85787A63727287E4138F3AD37B55CD6BDAB91A55279"))

    }
}

