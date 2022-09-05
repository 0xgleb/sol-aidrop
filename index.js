const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js')

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

console.log(publicKey.toString());

const network = 'devnet'

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl(network), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Wallet balance: ${walletBalance / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.error(err)
    }
}

const airdropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl(network), 'confirmed')
        const fromAirdropSig = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirdropSig)
    } catch (err) {
        console.error(err)
    }
}

const main = async () => {
    await getWalletBalance()

    await airdropSol()

    await getWalletBalance()
}

main()
