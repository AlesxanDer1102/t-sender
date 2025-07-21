import { defineWalletSetup } from '@synthetixio/synpress'
import { MetaMask } from '@synthetixio/synpress/playwright'

const SEED_PHRASE = 'test test test test test test test test test test test junk'
const PASSWORD = 'Tester@1234'


export default defineWalletSetup(PASSWORD, async (Context, walletPage) => {

    const metamask = new MetaMask(Context, walletPage, PASSWORD)

    await metamask.importWallet(SEED_PHRASE)
})
