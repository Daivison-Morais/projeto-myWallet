import ReactDOM from "react-dom";
import App from "./components/App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App/>
  </QueryClientProvider>,
  document.querySelector(".root")
);
