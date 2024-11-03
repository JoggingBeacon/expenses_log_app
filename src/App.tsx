import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./routers/main_routers";

function App() {
  return <RouterProvider router={mainRouter} />;
}

export default App;
