export enum TransactionStatus {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}

export enum TransactionType {
  Deposit = "Deposit",
  Withdrawal = "Withdrawal",
  Purchase = "Purchase",
}

export interface CreateTransaction {
  amount: number; // Transaction amount (+ for deposit, - for withdrawal)
  currency: string; // Currency (e.g., "USD", "GEL")
  paymentMethod: "PayPal" | "CreditCard" | "BankTransfer"; // Extend as needed
  status: TransactionStatus; // Enum for Pending, Completed, Failed
  transactionType: TransactionType; // Deposit, Withdrawal, Purchase
  paypalTransactionId?: string; // Optional PayPal Transaction ID
}
