import { activeAtom, settingsAtom, todosAtom } from "@atoms";
import { Input } from "@components";
import { InputThemes } from "@themes";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styles from "./Title.module.scss";
import { Settings, ThreeDot } from "@icons";
import { PAGES } from "@constants";

const SortIcon = props => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		style={{ width: "1.1rem", height: "1.1rem" }}
		{...props}
	>
		<line x1="21" y1="10" x2="7" y2="10" />
		<line x1="21" y1="6" x2="3" y2="6" />
		<line x1="21" y1="14" x2="11" y2="14" />
		<line x1="21" y1="18" x2="15" y2="18" />
	</svg>
);

const Title = () => {
	const titleRef = useRef(null);
	const menuRef = useRef(null);
	const [active, setActive] = useRecoilState(activeAtom);
	const [settings, setSettings] = useRecoilState(settingsAtom);
	const [todos, setTodos] = useRecoilState(todosAtom);
	const [editTitle, setEditTitle] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		if (editTitle) titleRef.current.focus();
	}, [editTitle]);

	useEffect(() => {
		const handleClickOutside = event => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};

		if (showDropdown) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showDropdown]);

	const onLinkClick = page => {
		setActive(prev => ({ ...prev, page }));
	};

	const sortTodos = () => {
		if (!active.category || !todos[active.category]) return;
		setTodos(prev => {
			const categoryTodos = prev[active.category];
			if (!categoryTodos) return prev;
			const sorted = [...categoryTodos].sort((a, b) => {
				if (a.checked === b.checked) return 0;
				return a.checked ? 1 : -1;
			});
			return {
				...prev,
				[active.category]: sorted,
			};
		});
	};

	return (
		<div className={styles.title}>
			{editTitle ? (
				<Input
					value={settings.title}
					setValue={value => setSettings(prev => ({ ...prev, title: value }))}
					onBlur={() => setEditTitle(false)}
					onKeyDown={e => e.key === "Enter" && setEditTitle(false)}
					height="fit-content"
					theme={InputThemes.TRANSPARENT}
					ref={titleRef}
				/>
			) : (
				<span title="Double click to edit" onDoubleClick={() => setEditTitle(true)}>
					{settings.title}
				</span>
			)}

			<div className={styles.menuContainer} ref={menuRef}>
				<button
					onClick={() => setShowDropdown(prev => !prev)}
					className={`${styles.menuBtn} ${showDropdown ? styles.active : ""}`}
				>
					<ThreeDot />
				</button>
				{showDropdown && (
					<div className={styles.dropdown}>
						<button
							onClick={() => {
								sortTodos();
								setShowDropdown(false);
							}}
							className={styles.dropdownItem}
							disabled={!active.category || !todos[active.category] || todos[active.category].length === 0}
						>
							<SortIcon />
							<span>Sort Todos</span>
						</button>
						<button
							onClick={() => {
								onLinkClick(PAGES.SETTINGS);
								setShowDropdown(false);
							}}
							className={styles.dropdownItem}
						>
							<Settings size="1.1rem" />
							<span>Settings</span>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Title;


