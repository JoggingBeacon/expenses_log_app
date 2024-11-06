import supa from "@src/config/supabase/index";

/**
 *
 * @returns result
 *
 * Returning object api response contain expenses,
 * deposits logs and latest balance
 */
export async function dashboardLoader() {
  // Get the data from database
  const { data, error } = await supa
    .from("transaction_logs")
    .select("*")
    .order("created_at", { ascending: true });

  if (data) {
    // Split array into two, base of the type
    const [expenses, deposits] = data.reduce(
      (acc: Transaction[][], item) => {
        const { type } = item;

        if (type === "Expense") {
          acc[0].push(item);
        } else {
          acc[1].push(item);
        }
        return acc;
      },
      [[], []]
    );

    let latest_balance = 0;
    if (data[data.length - 1]) {
      latest_balance = data[data.length - 1].balance;
    }

    // Concatenate the response
    return {
      logs: {
        expenses: expenses,
        deposits: deposits,
      },
      latest_balance: latest_balance,
    };
  } else {
    throw error;
  }
}
