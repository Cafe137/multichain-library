import { FixedPointNumber, Objects } from 'cafe-utility'
import { Constants } from './Constants'
import { getGnosisBzzBalance } from './GnosisBzzBalance'
import { getGnosisNativeBalance } from './GnosisNativeBalance'
import { transferGnosisNative, TransferGnosisNativeOptions } from './GnosisNativeTransfer'
import { GnosisSwapAutoOptions, GnosisSwapCustomOptions, swapOnGnosisAuto, swapOnGnosisCustom } from './GnosisSwap'
import { getGnosisTransactionCount } from './GnosisTransactionCount'
import { getDefaultMultichainLibrarySettings, MultichainLibrarySettings } from './Settings'
import { getSushiSwapQuote, SushiResponse } from './SushiSwap'
import { getGnosisBzzTokenPrice, getTokenPrice } from './TokenPrice'
import {
    waitForGnosisBzzBalanceToIncrease,
    waitForGnosisNativeBalanceToDecrease,
    waitForGnosisNativeBalanceToIncrease
} from './Waiter'

export { MultichainLibrarySettings } from './Settings'
export { SushiResponse } from './SushiSwap'

export class MultichainLibrary {
    settings: MultichainLibrarySettings
    constants: typeof Constants = Constants

    constructor(settings?: Partial<MultichainLibrarySettings>) {
        this.settings = Objects.deepMerge2(getDefaultMultichainLibrarySettings(), settings || {})
    }

    getGnosisBzzBalance(address: string): Promise<FixedPointNumber> {
        return getGnosisBzzBalance(address, this.settings)
    }

    getGnosisNativeBalance(address: `0x${string}`): Promise<FixedPointNumber> {
        return getGnosisNativeBalance(address, this.settings)
    }

    getTokenPrice(tokenAddress: `0x${string}`, chainId: number): Promise<number> {
        return getTokenPrice(tokenAddress, chainId, this.settings)
    }

    getGnosisBzzTokenPrice(): Promise<number> {
        return getGnosisBzzTokenPrice(this.settings)
    }

    transferGnosisNative(options: TransferGnosisNativeOptions): Promise<`0x${string}`> {
        return transferGnosisNative(options, this.settings)
    }

    waitForGnosisBzzBalanceToIncrease(address: string, initialBalance: bigint): Promise<void> {
        return waitForGnosisBzzBalanceToIncrease(address, initialBalance, this.settings)
    }

    waitForGnosisNativeBalanceToDecrease(address: `0x${string}`, initialBalance: bigint): Promise<void> {
        return waitForGnosisNativeBalanceToDecrease(address, initialBalance, this.settings)
    }

    waitForGnosisNativeBalanceToIncrease(address: `0x${string}`, initialBalance: bigint): Promise<void> {
        return waitForGnosisNativeBalanceToIncrease(address, initialBalance, this.settings)
    }

    swapOnGnosisAuto(options: GnosisSwapAutoOptions): Promise<`0x${string}`> {
        return swapOnGnosisAuto(options, this.settings)
    }

    swapOnGnosisCustom(options: GnosisSwapCustomOptions): Promise<`0x${string}`> {
        return swapOnGnosisCustom(options, this.settings)
    }

    getGnosisTransactionCount(address: `0x${string}`): Promise<number> {
        return getGnosisTransactionCount(address, this.settings)
    }

    getSushiSwapQuote(amount: string, sender: string, recipient: string): Promise<SushiResponse> {
        return getSushiSwapQuote(amount, sender, recipient, this.settings)
    }
}
