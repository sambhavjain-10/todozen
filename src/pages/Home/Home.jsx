import Categories from "./components/Categories/Categories";
import Todos from "./components/Todos/Todos";
import { DragDropContext } from "react-beautiful-dnd";
import { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeAtom, categoriesAtom, todosAtom } from "@atoms";
import Title from "./components/Title/Title";
import { Input } from "@components";
import { InputThemes } from "@themes";
import styles from "./Home.module.scss";
import { Plus } from "@icons";

const defaultTodo = () => ({
	id: crypto.randomUUID(),
	checked: false,
	title: "",
	desc: "",
	category: "",
	tags: [],
});

const Home = () => {
	const [todos, setTodos] = useRecoilState(todosAtom);
	const [categories, setCategories] = useRecoilState(categoriesAtom);
	const [value, setValue] = useState("");

	const category = useRecoilValue(activeAtom).category;

	const onAdd = () => {
		if (!value.trim().length) return;
		const newTodo = defaultTodo();
		newTodo.title = value;
		setTodos(prev => ({ ...prev, [category]: [newTodo, ...(prev[category] || [])] }));
		setValue("");
	};

	const onDragEnd = useCallback(
		e => {
			console.log(e);
			const { draggableId, source, destination } = e;
			if (!destination) return;
			//todos => todos
			if (source.droppableId === "todos" && source.droppableId === destination.droppableId) {
				setTodos(prev => {
					let newArr = [...prev[category]];
					newArr.splice(destination.index, 0, newArr.splice(source.index, 1)[0]);
					return { ...prev, [category]: newArr };
				});
				return;
			}
			//categories => categories
			if (source.droppableId === "categories" && source.droppableId === destination.droppableId) {
				setCategories(prev => {
					let newArr = [...prev];
					newArr.splice(destination.index, 0, newArr.splice(source.index, 1)[0]);
					return newArr;
				});
			}
			// //todos => categories
			// if (
			// 	source.droppableId === "todos" &&
			// 	JSON.parse(destination.droppableId).type === "category" &&
			// 	category !== JSON.parse(destination.droppableId).id
			// ) {
			// 	const newCategoryId = JSON.parse(destination.droppableId).id;
			// 	setTodos(prev => {
			// 		let todo = prev[category].find(todo => todo.id === draggableId);
			// 		return {
			// 			...prev,
			// 			[category]: prev[category].filter(todo => todo.id !== draggableId),
			// 			[newCategoryId]: [todo, ...prev[newCategoryId]],
			// 		};
			// 	});
			// 	return;
			// }
		},
		[category]
	);

	return (
		<>
			<Title />
			<DragDropContext onDragEnd={onDragEnd}>
				<Categories />
				<Todos />
				<div className={styles.input}>
					<Input
						value={value}
						setValue={setValue}
						onKeyDown={e => e.key === "Enter" && !e.shiftKey && onAdd()}
						autoFocus
						theme={InputThemes.PRIMARY}
						placeholder="Type here"
					/>
					<button onClick={onAdd} className={styles.addBtn}>
						<Plus size="1.2rem" />
					</button>
				</div>
			</DragDropContext>
		</>
	);
};

export default Home;
