import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "tags",
});

const tags = atom({
	key: "tags",
	default: [
		{
			name: "Bug",
			color: "#d61818",
		},
	],
	effects_UNSTABLE: [persistAtom],
});

export default tags;
