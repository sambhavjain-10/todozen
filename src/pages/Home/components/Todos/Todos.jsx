import { activeAtom, todosAtom } from "@atoms";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Todo from "./Todo/Todo";
import styles from "./Todos.module.scss";

const Todos = () => {
	const [todos] = useRecoilState(todosAtom);
	const category = useRecoilValue(activeAtom).category;
	const [showDelete, setshowDelete] = useState(false);

	useEffect(() => {
		window.addEventListener("keydown", e => e.key === "Shift" && setshowDelete(true));
		window.addEventListener("keyup", e => e.key === "Shift" && setshowDelete(false));
	}, []);

	return (
		<div className={styles.container}>
			{todos
				.filter(todo => todo.category === category)
				.sort((a, b) => {
					if (a.checked) return 1;
					else if (!a.checked) return -1;
				})
				.map(todo => (
					<Todo key={todo.id} todo={todo} showDelete={showDelete} />
				))}
		</div>
	);
};

export default Todos;
