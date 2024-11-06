import { useEffect, useState } from "react";
import { dashboardLoader } from "@src/loaders";
import { DepoList, ExpeList } from "./LogList";
import { formatThousands } from "@src/utils";
import Form from "./Form";

const defaultLogs: Log = {
  latest_balance: 0,
  logs: {
    deposits: [],
    expenses: [],
  },
};
export default function Dashboard() {
  const [transactionList, setList] = useState<Log>(defaultLogs);
  const [showForm, setForm] = useState(false);

  // Fetch the data
  useEffect(() => {
    const fetch = async () => {
      const data = await dashboardLoader();

      setList(data);
    };

    fetch();
  }, []);

  return (
    <div className="p-4">
      <div className="p-2 mb-4 rounded bg-cyan-200">
        <h2 className="">
          <span className="block text-sm font-bold">Sisa saldo:</span>{" "}
          <span className="block text-5xl font-semibold">
            {transactionList.latest_balance
              ? formatThousands(transactionList.latest_balance)
              : 0}
          </span>
        </h2>
      </div>

      <div>
        <button
          className="w-full p-2 mb-4 bg-purple-200 rounded hover:bg-purple-400 active:bg-purple-500"
          onClick={() => setForm(!showForm)}
        >
          <span>{showForm ? "Tutup" : "Buat catatan"}</span>
        </button>
      </div>

      <div>
        {showForm && <Form latest_balance={transactionList.latest_balance} />}
      </div>

      <DepoList
        title="Uang Masuk"
        trans={transactionList.logs.deposits}
        className="p-2 mb-4 bg-purple-200 rounded"
      />
      <ExpeList title="Daftar belanja" trans={transactionList.logs.expenses} />
    </div>
  );
}
