import { FixedPointNumber, Types } from 'cafe-utility'
import { MultichainLibrarySettings } from './Settings'

export async function getGnosisNativeBalance(
    address: `0x${string}`,
    settings: MultichainLibrarySettings
): Promise<FixedPointNumber> {
    const payload = { jsonrpc: '2.0', id: 1, method: 'eth_getBalance', params: [address, 'latest'] }
    const response = await fetch(settings.gnosisJsonRpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(settings.fetchTimeoutMillis)
    })
    const data = await response.json()
    const object = Types.asObject(data)
    const price = Types.asHexString(object.result, { strictPrefix: true, uneven: true })
    return new FixedPointNumber(BigInt(price), 18)
}
