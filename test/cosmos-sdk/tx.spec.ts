import { Describe, Test } from '@jest-decorated/core';
import { MsgSend } from '../../src/cosmos/bank/v1beta1/tx';
import { getClient } from '../../helpers/tx-client';


@Describe('Test tx cosmos sdk')
export default class Tx {

    @Test('tx bank send')
    public async BankSend() {
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
        console.log(response);

    }
}

