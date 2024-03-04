import Navbar from "./Navbar";
import Pannel from "./Pannel";
import { useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

const Home = () => {
  const endpoint =
    "https://solana-devnet.g.alchemy.com/v2/AhRbCbMvT2COnyi2F0ake3HvXoQbhEEK";
  const [balance, setBalance] = useState(0);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <div className="h-screen w-screen bg-black text-white">
          <Navbar balance={balance} setBalance={setBalance} />
          <Pannel balance={balance} />
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Home;
