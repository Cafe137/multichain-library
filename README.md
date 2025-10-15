# Multichain Library

This repository contains a collection of cross-environment functions that are helpful for building swap and token transfer logic.

# Getting Started

Create an instance of the library:

```ts
const library = new MultichainLibrary(settings)
```

`settings` is optional, supporting:

-   `gnosisJsonRpc`
-   `fetchTimeoutMillis`

## Nonce helpers

-   `getGnosisTransactionCount(address: string): Promise<number>`

## Balance getters

-   `getGnosisBzzBalance(address: string): Promise<FixedPointNumber>`
-   `getGnosisNativeBalance(address: string): Promise<FixedPointNumber>`

## Price getters

-   `getTokenPrice(tokenAddress: string, chainId: number): Promise<number>`
-   `getGnosisBzzTokenPrice(): Promise<number>`

## Waiters

-   `waitForGnosisBzzBalanceToIncrease(address: string, initialBalance: bigint): Promise<void>`
-   `waitForGnosisNativeBalanceToDecrease(address: string, initialBalance: bigint): Promise<void>`
-   `waitForGnosisNativeBalanceToIncrease(address: string, initialBalance: bigint): Promise<void>`

## SushiSwap helpers

-   `getSushiSwapQuote(amount: string, sender: string, recipient: string): Promise<SushiResponse>`
-   `swapOnGnosisCustom(options: GnosisSwapCustomOptions): Promise<string>`
-   `swapOnGnosisAuto(options: GnosisSwapAutoOptions): Promise<string>`
