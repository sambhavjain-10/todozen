import { todosAtom } from "@atoms";
import { Input } from "@components";
import { InputThemes } from "@themes";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styles from "./Todo.module.scss";

const Todo = ({ todo, showDelete }) => {
	const inputRef = useRef(null);
	const setTodos = useSetRecoilState(todosAtom);

	const [isEdit, setIsEdit] = useState(false);
	const [tempTodo, setTempTodo] = useState({});

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.height = "";
			inputRef.current.style.height = inputRef.current.scrollHeight + "px";
		}
	}, [tempTodo, inputRef, isEdit]);

	const onEditTodo = cat => {
		setIsEdit(cat.id);
		setTempTodo(cat);
		setTimeout(() => {
			inputRef.current.focus();
		}, 100);
	};

	const onEditBlur = () => {
		setTodos(prev =>
			prev.map(todo => {
				if (todo.id === tempTodo.id) return tempTodo;
				return todo;
			})
		);
		setIsEdit(false);
	};

	const setTodoTitle = val => setTempTodo(prev => ({ ...prev, title: val }));

	const onDelete = id => setTodos(prev => prev.filter(todo => todo.id !== id));

	const onCheckboxChange = () => {
		setTodos(prev =>
			prev.map(orgTodo => {
				if (orgTodo.id === todo.id) return { ...orgTodo, checked: !orgTodo.checked };
				return orgTodo;
			})
		);
	};

	return (
		<div className={`${styles.container} ${todo.checked ? styles.checked : ""}`}>
			<div className={styles.checkbox}>
				<input type="checkbox" checked={todo.checked} onChange={onCheckboxChange} />
			</div>
			<div className={styles.text} onDoubleClick={() => onEditTodo(todo)} onBlur={onEditBlur}>
				{isEdit === todo.id ? (
					<Input
						type="textarea"
						theme={InputThemes.TRANSPARENT}
						value={tempTodo.title}
						setValue={val => setTodoTitle(val)}
						onKeyDown={e => e.key === "Enter" && !e.shiftKey && onEditBlur()}
						ref={inputRef}
						resize="none"
					/>
				) : (
					<span>{todo.title}</span>
				)}
			</div>
			<div className={styles.deleteBtn} onClick={() => showDelete && onDelete(todo.id)}>
				{showDelete && "x"}
			</div>
		</div>
	);
};

export default Todo;
