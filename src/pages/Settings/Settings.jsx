/* eslint-disable no-undef */
import { activeAtom, settingsAtom } from "@atoms";
import { PAGES } from "@constants";
import { useSetRecoilState, useRecoilState } from "recoil";
import styles from "./Settings.module.scss";
import { SketchPicker } from "react-color";
import { useEffect, useState } from "react";

const AUTH_LINK =
	"https://trello.com/1/authorize?expiration=never&name=TodoExtension&scope=read,write&response_type=token&key=03c19ecc280aa040fda38dc899378fc8&return_url=http://localhost:5173/authorize.html";

const Settings = () => {
	const setActive = useSetRecoilState(activeAtom);
	const [savedSettings, setSavedSettings] = useRecoilState(settingsAtom);

	//settings
	const [settings, setSettings] = useState(savedSettings);

	//saved settings
	const handleSaveSettings = () => {
		setSavedSettings(settings);
	};

	useEffect(() => {
		const getCookie = async () => {
			await chrome.cookies.get({ url: "http://localhost:5173/", name: "todozen_token" }, cookie => {
				console.log("Test");
				console.log(cookie);
				if (cookie) {
					setSavedSettings(prev => ({
						...prev,
						token: cookie.value,
					}));
				}
			});
		};
		getCookie();
	}, []);

	return (
		<div className={styles.settings}>
			<div className={styles.header}>
				<div>Settings</div>
			</div>
			<div>
				<a href={AUTH_LINK} target="_blank" rel="noopener noreferrer">
					<button>Connect to Trello</button>
				</a>
			</div>
			<div onClick={handleSaveSettings}>
				<button>Save</button>
			</div>
		</div>
	);
};

export default Settings;
