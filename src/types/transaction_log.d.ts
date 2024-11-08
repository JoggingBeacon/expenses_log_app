type Transaction = {
  amount: number;
  balance: number;
  created_at: string;
  description: string | null;
  id: number;
  type: Database["public"]["Enums"]["transaction_type"];
};

type Log = {
  logs: {
    expenses: Transaction[];
    deposits: Transaction[];
  };
  latest_balance: number;
};
