import { activeAtom, categoriesAtom, todosAtom } from "@atoms";
import { Input } from "@components";
import { InputThemes } from "@themes";
import { getRandomColor, getTextColor } from "@utils";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "./Categories.module.scss";
import { Droppable } from "react-beautiful-dnd";
import { Delete, Plus } from "@icons";

const dummyCategory = () => ({
	id: crypto.randomUUID(),
	background: getRandomColor(),
	name: "",
});

const Categories = () => {
	const inputRef = useRef(null);
	const inputRef2 = useRef(null);
	//atom states
	const [categories, setCategories] = useRecoilState(categoriesAtom);
	const [todos, setTodos] = useRecoilState(todosAtom);
	const [active, setActive] = useRecoilState(activeAtom);

	//inner states

	const [isAdd, setIsAdd] = useState(false);
	const [tempCategory, setTempCategory] = useState({});

	const [isEdit, setIsEdit] = useState(false);

	//functions

	const onCategoryClick = id => setActive(prev => ({ ...prev, category: id }));

	const onAddNewCategory = () => {
		setIsAdd(true);
		setTempCategory(dummyCategory());
		setTimeout(() => {
			inputRef2.current.focus();
		}, 100);
	};

	const onAddBlur = () => {
		setCategories(prev => [...prev, tempCategory]);
		setTodos(prev => ({
			...prev,
			[tempCategory.id]: [],
		}));
		setIsAdd(false);
		onCategoryClick(tempCategory.id);
	};

	const onEditCategory = cat => {
		setIsEdit(cat.id);
		setTempCategory(cat);
		setTimeout(() => {
			inputRef.current.focus();
		}, 100);
	};

	const onEditBlur = () => {
		setCategories(prev =>
			prev.map(cat => {
				if (cat.id === tempCategory.id) return tempCategory;
				return cat;
			})
		);
		setIsEdit(false);
	};

	const onDelete = id => setCategories(prev => prev.filter(cat => cat.id !== id));

	const setCategoryName = val => setTempCategory(prev => ({ ...prev, name: val }));

	return (
		<div className={styles.container}>
			<div className={styles.categories}>
				{categories.map(cat => (
					<Droppable droppableId={JSON.stringify({ type: "category", id: cat.id })} key={cat.id}>
						{provided => (
							<div ref={provided.innerRef} {...provided.droppableProps} className={styles.categories}>
								<span
									style={{ borderColor: cat.background, ...(active.category === cat.id && { background: cat.background }) }}
									className={`${styles.category} ${active.category === cat.id ? styles.active : ""}`}
									onClick={() => onCategoryClick(cat.id)}
									onDoubleClick={() => onEditCategory(cat)}
									onBlur={onEditBlur}
								>
									{isEdit === cat.id ? (
										<Input
											theme={InputThemes.TRANSPARENT}
											value={tempCategory.name}
											setValue={val => setCategoryName(val)}
											style={{
												color: getTextColor(tempCategory.background),
												width: `calc(${tempCategory.name.length * 6}px + 20px)`,
											}}
											height="fit-content"
											onKeyDown={e => e.key === "Enter" && onEditBlur()}
											ref={inputRef}
										/>
									) : (
										<div className={styles.info}>
											<span className={styles.name} style={{ color: cat.background }}>
												{cat.name}
											</span>
											<span
												className={styles.count}
												style={{ background: cat.background, ...(active.category === cat.id && { color: cat.background }) }}
											>
												{todos[cat.id]?.length ?? 0}
											</span>
										</div>
									)}
									<button className={styles.deleteBtn} onClick={() => onDelete(cat.id)}>
										<Delete size="1rem" />
									</button>
								</span>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				))}
				{isAdd ? (
					<span
						style={{
							background: tempCategory.background,
							color: getTextColor(tempCategory.background),
						}}
						className={styles.category}
					>
						<Input
							theme={InputThemes.TRANSPARENT}
							value={tempCategory.name}
							setValue={val => setCategoryName(val)}
							onBlur={onAddBlur}
							onKeyDown={e => e.key === "Enter" && onAddBlur()}
							style={{
								color: getTextColor(tempCategory.background),
								width: `calc(${tempCategory.name.length * 6}px + 20px)`,
							}}
							height="fit-content"
							width="fit-content"
							ref={inputRef2}
						/>
					</span>
				) : (
					<button onClick={onAddNewCategory} className={styles.addBtn}>
						<Plus size="1.2rem" />
					</button>
				)}
			</div>
		</div>
	);
};

export default Categories;
