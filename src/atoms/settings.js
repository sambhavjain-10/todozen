import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "settings",
});

const settings = atom({
	key: "settings",
	default: {
		title: "Todo's",
		theme: {
			background: "#cfcfcf",
			primaryColor: "#000",
			titleColor: "#000",
			todoColor: "#000",
		},
		width: "410px",
		height: "600px",
	},
	effects_UNSTABLE: [persistAtom],
});

export default settings;
