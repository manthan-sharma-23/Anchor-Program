// send sol to any account on devnet / testnet


import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { connection, signer } from "./connection";
import { requestAndConfirmAirdropIfRequired } from "@solana-developers/helpers";

const solToSend = Number(process.argv[3]);
let recieverAddress = process.argv[2];

async function transfer(): Promise<void> {
  try {
    const reciever = new PublicKey(recieverAddress);

    await requestAndConfirmAirdropIfRequired(
      connection,
      signer.publicKey,
      10 * LAMPORTS_PER_SOL,
      5 * LAMPORTS_PER_SOL
    );

    const transaction = new Transaction();
    const sendSolTransaction = SystemProgram.transfer({
      fromPubkey: signer.publicKey,
      toPubkey: reciever,
      lamports: solToSend * LAMPORTS_PER_SOL,
    });

    transaction.add(sendSolTransaction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      signer,
    ]);

    console.log(`Sent SOL ${solToSend} to ${recieverAddress}`);
  } catch (error) {
    console.log(error);
  }
}

transfer();
