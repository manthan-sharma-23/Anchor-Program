import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import * as web3 from "@solana/web3.js";

const Navbar = ({
  balance,
  setBalance,
}: {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { select, publicKey, wallets, disconnect } = useWallet();

  const { connection } = useConnection();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (info) => {
        setBalance(info.lamports / web3.LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      setBalance(info?.lamports || 0 / web3.LAMPORTS_PER_SOL);
    });
  }, [connection, publicKey, setBalance]);

  return (
    <div className="w-full h-[10vh] border-b-[1px] border-white/60 flex justify-between px-5 items-center">
      <p className="text-4xl font-bold">Wallet</p>
      <div className="w-auto h-full flex justify-center items-center gap-3">
        <p>{publicKey?.toString()}</p>
        <p>{balance}</p>
        <div>
          {publicKey ? (
            <p
              onClick={() => {
                disconnect();
                setBalance(0);
              }}
              className="mx-3 cursor-pointer"
            >
              Disconnect
            </p>
          ) : wallets ? (
            wallets
              .filter((wallet) => wallet.readyState === "Installed")
              .map((wallet) => {
                return (
                  <button
                    key={wallet.adapter.name}
                    onClick={() => select(wallet.adapter.name)}
                  >
                    <img src={wallet.adapter.icon} alt={wallet.adapter.name} />
                    {wallet.adapter.name}
                  </button>
                );
              })
          ) : (
            "No Wallet found Please install"
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
