import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import "dotenv/config";

export const connection = new Connection("http://localhost:8899");

export const signer = getKeypairFromEnvironment("SECRET_KEY");
