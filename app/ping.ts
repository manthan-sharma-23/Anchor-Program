import web3 from "@solana/web3.js";
import { connection, signer } from "./connection";

const PING_PROGRAM_ADDRESS = new web3.PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
);
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
);
async function ping(): Promise<void> {
  try {
    const transaction = new web3.Transaction();
    const pingInstruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: PING_PROGRAM_DATA_ADDRESS,
          isWritable: true,
          isSigner: false,
        },
      ],
      programId: PING_PROGRAM_ADDRESS,
    });

    transaction.add(pingInstruction);

    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [signer]
    );

    console.log(`Transact completed : ${signature}`);
  } catch (error) {
    console.log(error);
  }
}

ping();
