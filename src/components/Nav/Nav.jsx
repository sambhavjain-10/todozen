import { activeAtom, todosAtom } from "@atoms";
import { Input } from "@components";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styles from "./Nav.module.scss";
import { PAGES } from "@constants";
import { Home, Plus, Settings } from "@icons";

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
		setIsAdd(false);
	};

	const onLinkClick = page => {
		setActive(prev => ({ ...prev, page }));
	};

	useEffect(() => {
		if (isAdd) setTimeout(() => inputRef.current.focus(), 300);
	}, [isAdd]);

	useEffect(() => {
		window.addEventListener("keydown", e => e.key === "/" && setIsAdd(true));
	}, []);

	return (
		<div className={styles.container}>
			<div
				className={`${styles.addTodo} ${isAdd ? styles.isAdd : ""}`}
				onClick={() => {
					!isAdd && setIsAdd(true);
				}}
			>
				{isAdd ? (
					<Input
						type="textarea"
						value={value}
						setValue={setValue}
						onKeyDown={e => e.key === "Enter" && !e.shiftKey && onAdd()}
						ref={inputRef}
						onBlur={() => setIsAdd(false)}
					/>
				) : (
					<div className={styles.icon}>
						<Plus />
					</div>
				)}
			</div>
			<div className={styles.links}>
				<button onClick={() => onLinkClick(PAGES.HOME)} className={active.page === PAGES.HOME ? styles.active : ""}>
					<Home />
				</button>
				<button onClick={() => onLinkClick(PAGES.SETTINGS)} className={active.page === PAGES.SETTINGS ? styles.active : ""}>
					<Settings />
				</button>
			</div>
		</div>
	);
};

export default Nav;
