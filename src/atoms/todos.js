import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "todos",
});

const todos = atom({
	key: "todos",
	default: [
		{
			title: "Some Bug title",
			desc: "some bug description",
			attachments: [],
			tags: ["Bug"],
		},
	],
	effects_UNSTABLE: [persistAtom],
});

export default todos;
