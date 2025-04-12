import { motion } from "framer-motion";
import PayPalButton from "./Payments/PayPal";
import { Button } from "@material-tailwind/react";
import { CiCoins1 } from "react-icons/ci";
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
        className="bg-coal flex flex-col gap-3 justify-between border border-gray-700 h-96 p-6 shadow-lg w-1/2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h1 className="text-center">BUYING OPTIONS WILL BE DISPLAYED HERE</h1>
        <div className="flex h-full">
          <motion.div
            whileHover={{ backgroundColor: "#212121" }}
            className="grow m-2 p-2 flex flex-col"
          >
            <h2 className="text-center">Buy 10 coins</h2>
            <div className="grow  content-center">
              <Lottie
                className="size-36  mx-auto"
                loop={false}
                animationData={coinsAnimation}
              ></Lottie>
            </div>
            <div className="flex">
              <Button
                onClick={() => {
                  setAmount(10);
                  setOpenDepositDrawer(true);
                }}
                className="normal-case text-base border bg-raisin/30 border-purple-500 w-full rounded-none mx-auto"
              >
                Select
              </Button>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ backgroundColor: "#212121" }}
            className="grow m-2 p-2 flex flex-col"
          >
            <h2 className="text-center">Buy 20 coins</h2>
            <div className="grow  content-center">
              <Lottie
                className="size-36  mx-auto"
                loop={false}
                animationData={coinsAnimation}
              ></Lottie>
            </div>
            <div className="flex">
              <Button
                onClick={() => {
                  setAmount(20);
                  setOpenDepositDrawer(true);
                }}
                className="normal-case text-base border bg-raisin/30 border-purple-500 w-full rounded-none mx-auto"
              >
                Select
              </Button>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ backgroundColor: "#212121" }}
            className="grow m-2 p-2 flex flex-col"
          >
            <h2 className="text-center">Buy 30 coins</h2>
            <div className="grow  content-center">
              <Lottie
                className="size-36  mx-auto"
                loop={false}
                animationData={coinsAnimation}
              ></Lottie>
            </div>
            <div className="flex">
              <Button
                onClick={() => {
                  setAmount(30);
                  setOpenDepositDrawer(true);
                }}
                className="normal-case text-base border bg-raisin/30 border-purple-500 w-full rounded-none mx-auto"
              >
                Select
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <BalanceDepositDrawer
        open={openDepositDrawer}
        setOpen={setOpenDepositDrawer}
        amount={amount}
      />
    </motion.div>
  );
}
