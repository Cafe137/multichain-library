import { Dates } from 'cafe-utility'

export interface MultichainLibrarySettings {
    gnosisJsonRpc: string
    fetchTimeoutMillis: number
}

export function getDefaultMultichainLibrarySettings() {
    return {
        gnosisJsonRpc: 'https://xdai.fairdatasociety.org/',
        fetchTimeoutMillis: Dates.seconds(10)
    }
}
