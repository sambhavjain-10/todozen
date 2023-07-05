/* eslint-disable no-undef */
import { activeAtom, settingsAtom } from "@atoms";
import { PAGES } from "@constants";
import { useRecoilValue } from "recoil";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import styles from "./App.module.scss";
import { Nav } from "@components";

const App = () => {
	const page = useRecoilValue(activeAtom).page;
	const settings = useRecoilValue(settingsAtom);

	const renderPage = () => {
		switch (page) {
			case PAGES.HOME:
				return <Home />;
			case PAGES.SETTINGS:
				return <Settings />;
			default:
				return <Home />;
		}
	};

	return (
		<div
			className={styles.container}
			style={{
				// background: settings.background,
				color: settings.color,
				width: settings.width,
				height: settings.height,
			}}
		>
			{renderPage()}
			<Nav />
		</div>
	);
};

export default App;
