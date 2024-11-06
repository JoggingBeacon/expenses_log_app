import supa from "@src/config/supabase";
import { Database } from "@src/types/supabase";
import { FormEvent, useState } from "react";

export default function Form({ latest_balance }: { latest_balance: number }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] =
    useState<Database["public"]["Enums"]["transaction_type"]>("Expense");
  const [errorMessage, setError] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (desc === "" || amount === 0) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    let proper_amount = amount;

    if (type === "Expense") {
      proper_amount = amount * -1;
    }

    await supa
      .from("transaction_logs")
      .insert({
        description: desc,
        balance: latest_balance + proper_amount,
        amount: amount,
        type: type,
      })
      .select();

    setDesc("");
    setAmount(0);

    window.location.reload();
  };

  return (
    <form
      className="p-2 mb-4 border rounded border-slate-900"
      onSubmit={(e) => submit(e)}
    >
      {errorMessage && (
        <p className="text-sm italic text-red-500">Error: Input tidak valid</p>
      )}
      <div className="my-2">
        <label htmlFor="description" className="block mb-2">
          Deskripsi:
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="px-2 py-1 border rounded border-slate-300"
        />
      </div>
      <div className="my-2">
        <label htmlFor="amount" className="block mb-2">
          Jumlah:
        </label>
        <input
          pattern="[0-9]+"
          type="text"
          name="amount"
          id="amount"
          defaultValue={0}
          value={amount}
          onChange={(e) => {
            let newVal = Number.parseInt(e.target.value);
            if (!newVal) {
              newVal = 0;
            }
            setAmount(newVal);
          }}
          className="px-2 py-1 border rounded border-slate-300"
        />
      </div>
      <div className="my-3">
        <label htmlFor="type">Tipe: </label>
        <select
          onChange={(e) =>
            setType(e.target.value === "Deposit" ? "Deposit" : "Expense")
          }
          value={type}
          className="p-2 rouded ms-2"
        >
          <option value="Expense">Keluar/Belanja</option>
          <option value="Deposit">Masuk</option>
        </select>
      </div>
      <button className="px-4 py-2 bg-purple-200 rounded hover:bg-purple-400 active:bg-purple-500">
        Kirim
      </button>
    </form>
  );
}
