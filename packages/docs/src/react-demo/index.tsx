import ReactDOM from "react-dom/client";
import SelectSingleDemo1 from "./select-single-demo1";
import SelectMultipleDemo1 from "./select-multiple-demo1";
const App = () => (
  <div>
    <SelectSingleDemo1 />
    <SelectMultipleDemo1 />
  </div>
);

ReactDOM.createRoot(document.getElementById("component-demo-container")).render(
  <App />
);
