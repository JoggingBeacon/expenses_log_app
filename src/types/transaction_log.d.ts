type Transaction = {
  amount: number;
  balance: number;
  created_at: string;
  description: string | null;
  id: number;
  type: Database["public"]["Enums"]["transaction_type"];
};
