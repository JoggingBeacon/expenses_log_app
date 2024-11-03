import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const logs = useLoaderData();

  console.log(logs);

  return <h1>Dashboard</h1>;
}
