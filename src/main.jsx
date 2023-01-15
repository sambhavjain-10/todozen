import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./styles.scss";

if (!window.location.origin.includes("localhost")) console.log = () => null;

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<RecoilRoot>
		<App />
	</RecoilRoot>
	// </React.StrictMode>
);
