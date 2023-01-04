import { activeAtom, categoriesAtom } from "@atoms";
import { Input } from "@components";
import { InputThemes } from "@themes";
import { getRandomColor, getTextColor } from "@utils";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styles from "./Categories.module.scss";

const dummyCategory = () => ({
	id: crypto.randomUUID(),
	background: getRandomColor(),
	name: "",
});

const Categories = () => {
	const inputRef = useRef(null);
	//atom states
	const [categories, setCategories] = useRecoilState(categoriesAtom);
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
	};

	const onAddBlur = () => {
		setCategories(prev => [...prev, tempCategory]);
		setIsAdd(false);
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
			<div className={styles.title}>Categories</div>
			<div className={styles.categories}>
				{categories.map(cat => (
					<span
						key={cat.id}
						style={{ background: cat.background, color: getTextColor(cat.background) }}
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
								style={{ color: getTextColor(tempCategory.background) }}
								height="fit-content"
								onKeyDown={e => e.key === "Enter" && onEditBlur()}
								ref={inputRef}
							/>
						) : (
							cat.name
						)}
						<button className={styles.deleteBtn} onClick={() => onDelete(cat.id)}>
							x
						</button>
					</span>
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
							style={{ color: getTextColor(tempCategory.background) }}
							height="fit-content"
							width="fit-content"
						/>
					</span>
				) : (
					<button onClick={onAddNewCategory}>+</button>
				)}
			</div>
		</div>
	);
};

export default Categories;
