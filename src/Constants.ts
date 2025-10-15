import { FixedPointNumber } from 'cafe-utility'

export const Constants = {
    nullAddress: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    bzzGnosisAddress: '0xdbf3ea6f5bee45c02255b2c26a16f300502f68da' as `0x${string}`,
    ethereumChainId: 1,
    gnosisChainId: 100,
    daiDustAmount: FixedPointNumber.fromDecimalString('0.01', 18)
}
