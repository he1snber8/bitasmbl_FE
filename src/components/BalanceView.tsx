import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import BalanceDepositDrawer from "./BalanceDepositDrawer";
import coinsAnimation from "./animations/wired-flat-298-coins-loop-spin.json";
import Lottie from "lottie-react";

export default function BalanceView({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState<number>(0);
  const [openDepositDrawer, setOpenDepositDrawer] = useState<boolean>(false);

  return (
    <motion.div
      className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close modal when clicking outside
    >
      <motion.div
        className="bg- flex flex-col gap-3 justify-between h-96 p-6 shadow-lg w-1/2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h1 className="text-center">BUYING OPTIONS WILL BE DISPLAYED HERE</h1>
        <CoinSelection
          setOpenDepositDrawer={setOpenDepositDrawer}
          openDepositDrawer={openDepositDrawer}
          setAmount={setAmount}
          amount={amount}
        />
      </motion.div>
      <BalanceDepositDrawer
        open={openDepositDrawer}
        setOpen={setOpenDepositDrawer}
        amount={amount}
      />
    </motion.div>
  );
}

const CoinCard = ({
  amount,
  onClick,
}: {
  amount: number;
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ backgroundColor: "#212121" }}
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.3, delay: amount * 0.05 }}
    className="grow m-2 p-4 flex flex-col border border-concrete rounded-2xl"
  >
    <h2 className="text-center text-lg font-semibold">Buy {amount} coins</h2>
    <div className="grow flex justify-center items-center">
      <Lottie className="size-36" loop={false} animationData={coinsAnimation} />
    </div>
    <Button
      onClick={onClick}
      className="normal-case bg-transparent text-base font-light p-1   w-full rounded-md"
    >
      Select
    </Button>
  </motion.div>
);

export function CoinSelection({
  openDepositDrawer,
  setOpenDepositDrawer,
  setAmount,
  amount,
}: {
  openDepositDrawer: boolean;
  setOpenDepositDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
}) {
  return (
    <div className="flex h-full">
      {[10, 20, 30].map((coinAmount) => (
        <CoinCard
          key={coinAmount}
          amount={coinAmount}
          onClick={() => {
            setAmount(coinAmount);
            setOpenDepositDrawer(true);
          }}
        />
      ))}
    </div>
  );
}
