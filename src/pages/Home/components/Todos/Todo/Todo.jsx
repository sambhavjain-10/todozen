import { activeAtom, todosAtom } from "@atoms";
import { Checkbox, Input } from "@components";
import { InputThemes } from "@themes";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styles from "./Todo.module.scss";
import { Delete, ThreeDot } from "@icons";

const Todo = ({ todo }) => {
	const inputRef = useRef(null);
	const setTodos = useSetRecoilState(todosAtom);
	const active = useRecoilValue(activeAtom);

	const [isEdit, setIsEdit] = useState(false);
	const [tempTodo, setTempTodo] = useState({});
	const [showMore, setShowMore] = useState(false);
	const [showOptions, setShowOptions] = useState(false);

	useEffect(() => {
		window.addEventListener("keydown", e => e.key === "Shift" && setShowMore(true));
		window.addEventListener("keyup", e => e.key === "Shift" && setShowMore(false));
	}, []);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.height = "";
			inputRef.current.style.height = inputRef.current.scrollHeight + "px";
		}
	}, [tempTodo, inputRef, isEdit]);

	const onEditTodo = todo => {
		setIsEdit(todo.id);
		setTempTodo(todo);
		setTimeout(() => {
			inputRef.current.focus();
		}, 100);
	};

	const onEditBlur = () => {
		setTodos(prev => ({
			...prev,
			[active.category]: prev[active.category].map(todo => {
				if (todo.id === tempTodo.id) return tempTodo;
				return todo;
			}),
		}));
		setIsEdit(false);
	};

	const setTodoTitle = val => setTempTodo(prev => ({ ...prev, title: val }));

	const onDelete = id => setTodos(prev => ({ ...prev, [active.category]: prev[active.category].filter(todo => todo.id !== id) }));

	const onCheckboxChange = () => {
		setTodos(prev => ({
			...prev,
			[active.category]: prev[active.category].map(orgTodo => {
				if (orgTodo.id === todo.id) return { ...orgTodo, checked: !orgTodo.checked };
				return orgTodo;
			}),
		}));
	};

	return (
		<div
			className={`${styles.container} ${todo.checked ? styles.checked : ""} ${showMore ? styles.showMore : ""}`}
			onMouseLeave={() => setShowOptions(false)}
		>
			<Checkbox checked={todo.checked} onChange={onCheckboxChange} />
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
			<div className={styles.moreBtn}>
				<ThreeDot onClick={() => setShowOptions(todo.id)} />
				<div className={`${styles.options} ${showOptions === todo.id ? styles.visible : ""}`}>
					<button onClick={() => onDelete(todo.id)}>
						<Delete color="red" size="1.2rem" /> Delete
					</button>
				</div>
			</div>
			<div className={styles.deleteBtn} onClick={() => onDelete(todo.id)}>
				<Delete size="1.2rem" />
			</div>
		</div>
	);
};

export default Todo;
