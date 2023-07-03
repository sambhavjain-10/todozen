import { activeAtom, todosAtom } from "@atoms";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Todo from "./Todo/Todo";
import styles from "./Todos.module.scss";

const Todos = () => {
	const [todos] = useRecoilState(todosAtom);
	const category = useRecoilValue(activeAtom).category;
	const [showDelete, setshowDelete] = useState(false);

	return (
		<div className={styles.container}>
			<Droppable
				droppableId="todos"
				mode="virtual"
				renderClone={(provided, snapshot, rubric) => (
					<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
						<Todo
							key={todos[category][rubric.source.index].id}
							todo={todos[category][rubric.source.index]}
							showDelete={showDelete}
						/>
					</div>
				)}
			>
				{provided => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{todos[category]?.map((todo, index) => (
							<Draggable key={todo.id} draggableId={todo.id} index={index}>
								{provided => (
									<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
										<Todo key={todo.id} todo={todo} showDelete={showDelete} />
									</div>
								)}
							</Draggable>
						))}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Todos;
