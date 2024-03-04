import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";
import * as web3 from "@solana/web3.js";

const Pannel = ({ balance }: { balance: number }) => {
  const [solToSend, setSolToSend] = useState("");
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState(0);
  const { connection } = useConnection();

  const send = useCallback(async () => {
    try {
      if (balance < amount) {
        alert("Insufficient Balance");
        return;
      }

      const reciever = new web3.PublicKey(solToSend);
      if (!reciever) {
        alert("Invalid reciever Key");
        return;
      }

      console.log(publicKey, reciever);
      const transaction = new web3.Transaction();

      const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey!,
        toPubkey: reciever,
        lamports: amount * web3.LAMPORTS_PER_SOL,
      });
      console.log("hey");

      transaction.add(sendSolInstruction);

      await sendTransaction(transaction, connection).then((sig) => {
        console.log(sig);
      });
    } catch (error) {
      console.log(error);
    }
  }, [amount, balance, connection, publicKey, sendTransaction, solToSend]);

  if (!publicKey) {
    return (
      <div className="h-[90vh] w-full flex justify-center items-center text-lg">
        Please Connect to Some Wallet
      </div>
    );
  }

  return (
    <div className="h-[90vh] w-full flex justify-center items-center ">
      <div className="h-[55vh] w-[45vw] border-[1px] border-white/60 rounded-e-lg flex justify-center items-center flex-col gap-3">
        <input
          value={solToSend}
          onChange={(e) => setSolToSend(e.target.value)}
          className="text-black w-[25vw] h-[5vh] px-3 text-xl font-bold"
          placeholder="Enter the address to send sol to"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="text-black w-[25vw] h-[5vh] px-3 text-xl font-bold"
          placeholder="Enter the amount of lamports"
        />
        <button
          onClick={() => {
            send();
          }}
          className="bg-white text-2xl rounded-md w-[25vw] h-[5vh] bg-white/55 font-mono font-semibold"
        >
          Send SOL
        </button>
      </div>
    </div>
  );
};

export default Pannel;
