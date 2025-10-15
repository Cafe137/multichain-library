import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { gnosis } from 'viem/chains'
import { Constants } from './Constants'
import { getGnosisTransactionCount } from './GnosisTransactionCount'
import { MultichainLibrarySettings } from './Settings'
import { getSushiSwapQuote } from './SushiSwap'

export interface GnosisSwapAutoOptions {
    amount: string | bigint
    originPrivateKey: `0x${string}`
    originAddress: `0x${string}`
    to: `0x${string}`
}

export async function swapOnGnosisAuto(options: GnosisSwapAutoOptions, settings: MultichainLibrarySettings) {
    const quote = await getSushiSwapQuote(options.amount.toString(), options.originAddress, options.to, settings)
    return swapOnGnosisCustom(
        {
            originPrivateKey: options.originPrivateKey,
            originAddress: options.originAddress,
            gas: BigInt(quote.tx.gas),
            gasPrice: BigInt(quote.tx.gasPrice),
            to: quote.tx.to,
            value: BigInt(quote.tx.value),
            data: quote.tx.data
        },
        settings
    )
}

export interface GnosisSwapCustomOptions {
    originPrivateKey: `0x${string}`
    originAddress: `0x${string}`
    gas: bigint | string | number
    gasPrice: bigint | string | number
    to: `0x${string}`
    value: bigint | string | number
    data: `0x${string}`
}

export async function swapOnGnosisCustom(options: GnosisSwapCustomOptions, settings: MultichainLibrarySettings) {
    const account = privateKeyToAccount(options.originPrivateKey)
    const client = createWalletClient({ chain: gnosis, transport: http(settings.gnosisJsonRpc) })
    return account
        .signTransaction({
            chain: Constants.gnosisChainId,
            chainId: Constants.gnosisChainId,
            account: options.originAddress,
            gas: BigInt(options.gas),
            gasPrice: BigInt(options.gasPrice),
            type: 'legacy',
            to: options.to,
            value: BigInt(options.value),
            data: options.data,
            nonce: await getGnosisTransactionCount(options.originAddress, settings)
        })
        .then(signedTx => client.sendRawTransaction({ serializedTransaction: signedTx }))
}
