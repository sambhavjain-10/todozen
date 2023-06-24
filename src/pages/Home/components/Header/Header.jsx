import { activeAtom, settingsAtom } from "@atoms";
import { PAGES } from "@constants";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Title from "./components/Title/Title";
import styles from "./Header.module.scss";

const Header = () => {
	const setActive = useSetRecoilState(activeAtom);

	return (
		<div className={styles.header}>
			<div className={styles.container}>
				<Title />
				<button onClick={() => setActive(prev => ({ ...prev, page: PAGES.SETTINGS }))}>Settings</button>
			</div>
			<div className={styles.divider} />
		</div>
	);
};

export default Header;
