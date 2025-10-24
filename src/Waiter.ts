import { Dates, RollingValueProvider, System } from 'cafe-utility'
import { getGnosisBzzBalance } from './GnosisBzzBalance'
import { getGnosisNativeBalance } from './GnosisNativeBalance'
import { MultichainLibrarySettings } from './Settings'

export async function waitForGnosisBzzBalanceToIncrease(
    address: string,
    initialBalance: bigint,
    settings: MultichainLibrarySettings,
    jsonRpcProvider: RollingValueProvider<string>
): Promise<void> {
    await System.waitFor(
        async () => {
            try {
                const balance = await getGnosisBzzBalance(address, settings, jsonRpcProvider)
                return balance.value > initialBalance
            } catch (error) {
                console.error(`Error fetching ${address} wallet BZZ balance:`, error)
                return false
            }
        },
        { attempts: 20, waitMillis: Dates.seconds(15) }
    )
}

export async function waitForGnosisNativeBalanceToDecrease(
    address: `0x${string}`,
    initialBalance: bigint,
    settings: MultichainLibrarySettings,
    jsonRpcProvider: RollingValueProvider<string>
): Promise<void> {
    await System.waitFor(
        async () => {
            try {
                const balance = await getGnosisNativeBalance(address, settings, jsonRpcProvider)
                return balance.value < initialBalance
            } catch (error) {
                console.error(`Error fetching ${address} wallet native balance:`, error)
                return false
            }
        },
        { attempts: 20, waitMillis: Dates.seconds(15) }
    )
}

export async function waitForGnosisNativeBalanceToIncrease(
    address: `0x${string}`,
    initialBalance: bigint,
    settings: MultichainLibrarySettings,
    jsonRpcProvider: RollingValueProvider<string>
): Promise<void> {
    await System.waitFor(
        async () => {
            try {
                const balance = await getGnosisNativeBalance(address, settings, jsonRpcProvider)
                return balance.value > initialBalance
            } catch (error) {
                console.error(`Error fetching ${address} wallet native balance:`, error)
                return false
            }
        },
        { attempts: 20, waitMillis: Dates.seconds(15) }
    )
}
