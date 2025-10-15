import { FixedPointNumber, Types } from 'cafe-utility'
import { Constants } from './Constants'
import { MultichainLibrarySettings } from './Settings'

export async function getGnosisBzzBalance(
    address: string,
    settings: MultichainLibrarySettings
): Promise<FixedPointNumber> {
    address = address.toLowerCase()
    if (address.startsWith('0x')) {
        address = address.slice(2)
    }
    const payload = {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_call',
        params: [
            {
                from: Constants.nullAddress,
                data: `0x70a08231000000000000000000000000${address}`,
                to: Constants.bzzGnosisAddress
            },
            'latest'
        ]
    }
    const response = await fetch(settings.gnosisJsonRpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(settings.fetchTimeoutMillis)
    })
    const data = await response.json()
    const object = Types.asObject(data)
    const balance = Types.asHexString(object.result, { strictPrefix: true, uneven: true })
    return new FixedPointNumber(BigInt(balance), 16)
}
