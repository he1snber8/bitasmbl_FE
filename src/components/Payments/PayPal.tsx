import {
  useFillUpUserBalanceMutation,
  useGetProfileQuery,
  useUpdateUserMutation,
} from "src/api/UsersApi";
import {
  CreateTransaction,
  TransactionStatus,
  TransactionType,
} from "src/interfaces/transaction";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

export default function PayPalButton({ amount }: { amount: number }) {
  const [transaction, setTransaction] = useState<CreateTransaction | null>(
    null
  );
  const { data: profile } = useGetProfileQuery();
  const [fillUpUserBalance] = useFillUpUserBalanceMutation();
  const [updateUser] = useUpdateUserMutation();

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AV1gYTfhnsNllpui_DO_XgTr1mn5Jo6zOIuprfvVOU7kYg95jy4USK_as6nE_omdzSxhCgF-fI6VBCdV",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order!.capture().then((details) => {
            return (async () => {
              try {
                if (details.payer && profile) {
                  const createTransactionCommand: CreateTransaction = {
                    amount,
                    currency: "USD",
                    paymentMethod: "PayPal",
                    status: TransactionStatus.Completed,
                    transactionType: TransactionType.Deposit, // Adjust as needed
                    paypalTransactionId: details.id,
                  };

                  alert(`Transaction completed by ${profile.userName}`);

                  // await updateUser({ balance: amount });
                  await fillUpUserBalance(createTransactionCommand).unwrap();
                } else {
                  alert(
                    "Transaction completed, but payer details are unavailable."
                  );
                }

                console.log("Transaction Details:", details);
              } catch (error) {
                console.error("Error in onApprove:", error);
              }
            })();
          });
        }}
        // onApprove={(data, actions) => {
        //   return actions.order!.capture().then(async (details) => {
        //     if (details.payer && profile) {
        //       // const createTransactionCommand: CreateTransaction = {
        //       //   amount,
        //       //   currency: "USD",
        //       //   paymentMethod: "PayPal",
        //       //   status: TransactionStatus.Completed,
        //       //   transactionType: TransactionType.Deposit, // Adjust as needed
        //       //   paypalTransactionId: details.id,
        //       // };

        //       // await fillUpUserBalance(createTransactionCommand).unwrap();

        //       alert(
        //         `Transaction completed by ${details.payer.name?.given_name}`
        //       );
        //     } else {
        //       alert(
        //         "Transaction completed, but payer details are unavailable."
        //       );
        //     }
        //     console.log("Transaction Details:", details);
        //   });
        // }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          alert("Payment failed. Please try again.");
        }}
      />
    </PayPalScriptProvider>
  );
}
