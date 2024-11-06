import { dateGroup, formatThousands, formatToLocal } from "@src/utils";
import { ComponentProps, FC, useEffect, useState } from "react";

interface Prop extends ComponentProps<"div"> {
  title: string;
  trans?: Transaction[];
}

export const DepoList: FC<Prop> = ({ title, trans, ...rest }) => {
  return (
    <div {...rest}>
      <h2 className="mb-2 text-lg font-bold text-center">{title}</h2>

      <ul>
        {trans?.map((tran) => {
          let fd = formatToLocal(tran.created_at);
          return (
            <li className="p-2 border-t border-slate-500" key={tran.id}>
              <p className="text-xs">{`${fd.day}, ${fd.date} ${fd.month} ${fd.year}`}</p>
              <div className="flex justify-between font-bold">
                <p>{tran.description}</p>
                <p>{formatThousands(tran.amount)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const ExpeList: FC<Prop> = ({ title, trans, ...rest }) => {
  const [transaction, setTrans] = useState<Transaction[][]>();

  useEffect(() => {
    if (trans) setTrans(dateGroup(trans));
  }, [trans]);

  return (
    <div {...rest}>
      <h2 className="mb-2 text-lg font-bold text-center">{title}</h2>

      <ul className="bg-purple-200">
        {transaction?.map((tran, i) => {
          return <ListTranItem key={i} transactions={tran} index={i} />;
        })}
      </ul>
    </div>
  );
};

const ListTranItem = ({
  transactions,
  index,
}: {
  transactions: Transaction[];
  index: number;
}) => {
  return (
    <li key={index} className="p-2 mb-2 bg-teal-200 rounded">
      {transactions.map((tr) => {
        let fd = formatToLocal(tr.created_at);
        return (
          <div
            className="p-2 border-t first:border-none border-slate-500"
            key={tr.id}
          >
            <p className="text-xs">{`${fd.day}, ${fd.date} ${fd.month} ${fd.year}`}</p>
            <div className="flex justify-between font-bold">
              <p>{tr.description}</p>
              <p>{formatThousands(tr.amount)}</p>
            </div>
          </div>
        );
      })}
    </li>
  );
};
