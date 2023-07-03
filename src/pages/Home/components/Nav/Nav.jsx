import { activeAtom, todosAtom } from "@atoms";
import { Input } from "@components";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styles from "./Nav.module.scss";
import { PAGES } from "@constants";

const defaultTodo = () => ({
	id: crypto.randomUUID(),
	checked: false,
	title: "",
	desc: "",
	category: "",
	tags: [],
});

const Nav = () => {
	const [active, setActive] = useRecoilState(activeAtom);
	const inputRef = useRef(null);

	const setTodos = useSetRecoilState(todosAtom);
	const category = useRecoilValue(activeAtom).category;
	const [value, setValue] = useState("");
	const [isAdd, setIsAdd] = useState(false);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.height = "15px";
			inputRef.current.style.height = inputRef.current.scrollHeight + 3 + "px";
		}
	}, [inputRef, value]);

	const onAdd = () => {
		if (!value.trim().length) return;
		const newTodo = defaultTodo();
		newTodo.title = value;
		setTodos(prev => ({ ...prev, [category]: [newTodo, ...(prev[category] || [])] }));
		setValue("");
	};

	const onLinkClick = page => {
		setActive(prev => ({ ...prev, page }));
	};

	return (
		<div className={styles.container}>
			{isAdd ? (
				<div className={styles.addTodo}>
					<Input
						type="textarea"
						value={value}
						setValue={setValue}
						onKeyDown={e => {
							e.preventDefault();
							e.key === "Enter" && !e.shiftKey && onAdd();
						}}
						ref={inputRef}
						onBlur={() => setIsAdd(false)}
					/>
				</div>
			) : (
				<div className={styles.addTodo} onClick={() => setIsAdd(true)}>
					+
				</div>
			)}
			<div className={styles.links}>
				<button onClick={() => onLinkClick(PAGES.HOME)}>H</button>
				<button onClick={() => onLinkClick(PAGES.SETTINGS)}>S</button>
			</div>
		</div>
	);
};

export default Nav;
