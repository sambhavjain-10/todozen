import { settingsAtom } from "@atoms";
import { Input } from "@components";
import { InputThemes } from "@themes";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styles from "./Title.module.scss";

const Title = () => {
	const titleRef = useRef(null);
	const [settings, setSettings] = useRecoilState(settingsAtom);
	const [editTitle, setEditTitle] = useState(false);

	useEffect(() => {
		if (editTitle) titleRef.current.focus();
	}, [editTitle]);

	return (
		<div className={styles.title}>
			{editTitle ? (
				<Input
					value={settings.title}
					setValue={value => setSettings(prev => ({ ...prev, title: value }))}
					onBlur={() => setEditTitle(false)}
					height="fit-content"
					theme={InputThemes.TRANSPARENT}
					ref={titleRef}
				/>
			) : (
				<span title="Double click to edit" onDoubleClick={() => setEditTitle(true)}>
					{settings.title}
				</span>
			)}
		</div>
	);
};

export default Title;
