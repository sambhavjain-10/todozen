import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Todos from "./components/Todos/Todos";
import AddTodo from "./components/AddTodo/AddTodo";
import { DragDropContext } from "react-beautiful-dnd";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeAtom, categoriesAtom, todosAtom } from "@atoms";

const Home = () => {
	const [todos, setTodos] = useRecoilState(todosAtom);
	const [categories, setCategories] = useRecoilState(categoriesAtom);
	const category = useRecoilValue(activeAtom).category;

	const onDragEnd = useCallback(
		e => {
			console.log(e);
			const { source, destination } = e;
			//categories => todos
			if (source.droppableId === "categories" && destination.droppableId === "todos") return;
			//todos => todos
			if (source.droppableId === "todos" && source.droppableId === destination.droppableId) {
				setTodos(prev => {
					let newArr = [...prev[category]];
					newArr.splice(destination.index, 0, newArr.splice(source.index, 1)[0]);
					return { ...prev, [category]: newArr };
				});
			}
			//categories => categories
			if (source.droppableId === "categories" && source.droppableId === destination.droppableId) {
				setCategories(prev => {
					let newArr = [...prev];
					newArr.splice(destination.index, 0, newArr.splice(source.index, 1)[0]);
					return newArr;
				});
			}
			//todos => categories
			if (source.droppableId === "todos" && destination.droppableId === "categories") return;
		},
		[category]
	);

	return (
		<>
			<Header />
			<DragDropContext onDragEnd={onDragEnd}>
				<Categories />
				<Todos />
			</DragDropContext>
			<AddTodo />
		</>
	);
};

export default Home;
