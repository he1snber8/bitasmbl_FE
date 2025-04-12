import { Drawer } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import PayPalButton from "./Payments/PayPal";
import {
  CreateTransaction,
  TransactionStatus,
  TransactionType,
} from "../interfaces/transaction";
import { useFillUpUserBalanceMutation } from "../api/UsersApi";

export default function BalanceDepositDrawer({
  open,
  setOpen,
  amount,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
}) {
  const closeDrawer = () => setOpen(false);

  return (
    <Drawer
      open={open}
      size={900}
      transition={{ type: "tween", duration: 0.5 }}
      onClose={closeDrawer}
      className="bg-[#151515] border-y-[1px] flex flex-col items-center border-l-[1px]  overflow-y-hidden   border-concrete"
      placement="right"
    >
      <div className=" w-1/2 h-max my-auto">
        <div className="mb-12">
          <h1>Finish filling up the tank!</h1>
          <h2>Selected amount: {amount}</h2>
        </div>
        <PayPalButton amount={amount} />
      </div>
    </Drawer>
  );
}
