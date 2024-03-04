import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection } from "@solana/web3.js";
import "dotenv/config";

export const connection = new Connection(
  "https://solana-devnet.g.alchemy.com/v2/AhRbCbMvT2COnyi2F0ake3HvXoQbhEEK"
);

export const signer = getKeypairFromEnvironment("SECRET_KEY");
