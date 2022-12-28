import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "settings",
});

const settings = atom({
	key: "settings",
	default: {
		title: "Todo's",
		//customisation
		background: "#cfcfcf",
		color: "black",
		width: "800px",
		height: "600px",
	},
	effects_UNSTABLE: [persistAtom],
});

export default settings;
