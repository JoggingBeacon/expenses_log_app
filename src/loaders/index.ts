import supa from "@src/config/supabase/index";

export async function dashboardLoader() {
  // Get the latest balance
  const { data, error } = await supa
    .from("transaction_logs")
    .select("*")
    .order("created_at", { ascending: true });

  if (data) {
    const logs = data.map((d) => {
      const { id, created_at, type, description, amount } = d;
      return { id, created_at, type, description, amount };
    });
    const latest_balance = data[data.length - 1].balance;

    return {
      logs: logs,
      latest_balance: latest_balance,
    };
  } else {
    throw error;
  }
}
