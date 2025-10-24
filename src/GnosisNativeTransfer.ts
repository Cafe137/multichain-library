import { Dates, Numbers, Objects, RollingValueProvider, System } from 'cafe-utility'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { gnosis } from 'viem/chains'
import { Constants } from './Constants'
import { getGnosisTransactionCount } from './GnosisTransactionCount'
import { MultichainLibrarySettings } from './Settings'

export interface TransferGnosisNativeOptions {
    amount: string | bigint
    originPrivateKey: `0x${string}`
    originAddress: `0x${string}`
    to: `0x${string}`
}

export async function transferGnosisNative(
    options: TransferGnosisNativeOptions,
    settings: MultichainLibrarySettings,
    jsonRpcProvider: RollingValueProvider<string>
): Promise<`0x${string}`> {
    const account = privateKeyToAccount(options.originPrivateKey)
    const client = createWalletClient({
        chain: gnosis,
        transport: http(jsonRpcProvider.current())
    })
    for (let i = 1; i <= 5; i++) {
        try {
            const serializedTransaction = await account.signTransaction({
                chain: Constants.gnosisChainId,
                chainId: Constants.gnosisChainId,
                account: options.originAddress,
                gas: BigInt(21000),
                gasPrice: BigInt(Numbers.make(`${i} gwei`)),
                type: 'legacy',
                to: options.to,
                value: BigInt(options.amount),
                nonce: await getGnosisTransactionCount(options.originAddress, settings, jsonRpcProvider)
            })
            const hash = await client.sendRawTransaction({ serializedTransaction })
            return hash
        } catch (error) {
            if (Objects.errorMatches(error, 'FeeTooLow')) {
                await System.sleepMillis(Dates.seconds(2))
            } else {
                throw error
            }
        }
    }
    throw Error('Failed to send transaction after multiple attempts due to low fees.')
}
