import Categories from "./components/Categories/Categories";
import Todos from "./components/Todos/Todos";
import { DragDropContext } from "react-beautiful-dnd";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeAtom, categoriesAtom, todosAtom } from "@atoms";
import Title from "./components/Title/Title";

const Home = () => {
	const [todos, setTodos] = useRecoilState(todosAtom);
	const [categories, setCategories] = useRecoilState(categoriesAtom);
	const category = useRecoilValue(activeAtom).category;

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
			//todos => categories
			if (
				source.droppableId === "todos" &&
				JSON.parse(destination.droppableId).type === "category" &&
				category !== JSON.parse(destination.droppableId).id
			) {
				const newCategoryId = JSON.parse(destination.droppableId).id;
				setTodos(prev => {
					let todo = prev[category].find(todo => todo.id === draggableId);
					return {
						...prev,
						[category]: prev[category].filter(todo => todo.id !== draggableId),
						[newCategoryId]: [todo, ...prev[newCategoryId]],
					};
				});
				return;
			}
		},
		[category]
	);

	return (
		<>
			<Title />
			<DragDropContext onDragEnd={onDragEnd}>
				<Categories />
				<Todos />
			</DragDropContext>
		</>
	);
};

export default Home;
