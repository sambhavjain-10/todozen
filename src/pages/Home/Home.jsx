import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Todos from "./components/Todos/Todos";
import AddTodo from "./components/AddTodo/AddTodo";

const Home = () => {
	return (
		<>
			<Header />
			<Categories />
			<Todos />
			<AddTodo />
		</>
	);
};

export default Home;
