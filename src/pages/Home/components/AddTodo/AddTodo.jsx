import { activeAtom, todosAtom } from "@atoms";
import { Input } from "@components";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styles from "./AddTodo.module.scss";

const defaultTodo = () => ({
	id: crypto.randomUUID(),
	checked: false,
	title: "",
	desc: "",
	category: "",
	tags: [],
});

const AddTodo = () => {
	const inputRef = useRef(null);

	const setTodos = useSetRecoilState(todosAtom);
	const category = useRecoilValue(activeAtom).category;
	const [value, setValue] = useState("");

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

	return (
		<div className={styles.container}>
			<Input
				type="textarea"
				value={value}
				setValue={setValue}
				onKeyDown={e => e.key === "Enter" && !e.shiftKey && onAdd()}
				ref={inputRef}
			/>
			<button onClick={onAdd}>+</button>
		</div>
	);
};

export default AddTodo;
