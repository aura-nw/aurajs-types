import { DirectSecp256k1HdWallet, Registry, GeneratedType } from "@cosmjs/proto-signing";
import {
    defaultRegistryTypes as defaultStargateTypes,
    SigningStargateClient,
} from "@cosmjs/stargate";
import { MsgClearAdmin, MsgExecuteContract, MsgInstantiateContract, MsgInstantiateContract2, MsgMigrateContract, MsgStoreCode, MsgUpdateAdmin } from "../src/cosmwasm/wasm/v1/tx";
import { MsgCreatePeriodicVestingAccount } from "../src/vesting/v1beta1/tx";

const wasmTypes: ReadonlyArray<[string, GeneratedType]> = [
    ["/cosmwasm.wasm.v1.MsgStoreCode", MsgStoreCode],
    ["/cosmwasm.wasm.v1.MsgInstantiateContract", MsgInstantiateContract],
    ["/cosmwasm.wasm.v1.MsgInstantiateContract2", MsgInstantiateContract2],
    ["/cosmwasm.wasm.v1.MsgExecuteContract", MsgExecuteContract],
    ["/cosmwasm.wasm.v1.MsgMigrateContract", MsgMigrateContract],
    ["/cosmwasm.wasm.v1.MsgUpdateAdmin", MsgUpdateAdmin],
    ["/cosmwasm.wasm.v1.MsgClearAdmin", MsgClearAdmin],
];
const auraTypes: ReadonlyArray<[string, GeneratedType]> = [
    ["/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount", MsgCreatePeriodicVestingAccount]
];

export async function getClient(mnemonic: string, rpcEndpoint: string) {
    const myRegistry = new Registry([...defaultStargateTypes, ...wasmTypes, ...auraTypes]);
    // Inside an async function...
    const signer = await DirectSecp256k1HdWallet.fromMnemonic(
        mnemonic,
        { prefix: "aura" }, // Replace with your own Bech32 address prefix
    );
    const client = await SigningStargateClient.connectWithSigner(
        rpcEndpoint, // Replace with your own RPC endpoint
        signer,
        { registry: myRegistry },
    );
    return client
}