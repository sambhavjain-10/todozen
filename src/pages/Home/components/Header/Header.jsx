import { activeAtom, settingsAtom } from "@atoms";
import { PAGES } from "@constants";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styles from "./Header.module.scss";

const Header = () => {
	const setActive = useSetRecoilState(activeAtom);
	const [settings, setSettings] = useRecoilState(settingsAtom);

	const [editTitle, setEditTitle] = useState(false);

	useEffect(() => {
		if (editTitle) {
		}
	}, [editTitle]);

	return (
		<div className={styles.header}>
			<div>
				{editTitle ? (
					<input
						value={settings.title}
						onChange={e => setSettings(prev => ({ ...prev, title: e.target.value }))}
						onBlur={() => setEditTitle(false)}
					/>
				) : (
					<span onDoubleClick={() => setEditTitle(true)}>{settings.title}</span>
				)}
			</div>
			<button onClick={() => setActive(prev => ({ ...prev, page: PAGES.SETTINGS }))}>
				Settings
			</button>
		</div>
	);
};

export default Header;
