import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "categories",
});

const categories = atom({
	key: "categories",
	default: [
		{
			name: "Todo's",
			background: "#189ad6",
		},
	],
	effects_UNSTABLE: [persistAtom],
});

export default categories;
