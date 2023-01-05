import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "todos",
});

const todos = atom({
	key: "todos",
	default: [],
	effects_UNSTABLE: [persistAtom],
});

export default todos;
