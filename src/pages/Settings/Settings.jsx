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

	//other
	const [colorPicker, setColorPicker] = useState({ background: false, color: false });

	//size
	const handleSizeChange = (e, type) => {
		setSettings(prev => ({
			...prev,
			[type]: 300 + (e.target.value / 100) * (type === "height" ? 300 : 500),
		}));
	};

	//color
	const handleColorChange = (color, type) => {
		setSettings(prev => ({
			...prev,
			[type]: color.hex,
		}));
	};

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
				<button onClick={() => setActive(prev => ({ ...prev, page: PAGES.HOME }))}>Close</button>
			</div>
			<div>
				<span>Height: </span>
				<input
					type="range"
					value={((settings.height - 300) / 300) * 100}
					max={100}
					min={0}
					onChange={e => handleSizeChange(e, "height")}
				/>
			</div>
			<div>
				<span>Width: </span>
				<input
					type="range"
					value={((settings.width - 300) / 500) * 100}
					max={100}
					min={0}
					onChange={e => handleSizeChange(e, "width")}
				/>
			</div>
			<div>
				<span>Background: </span>
				<div
					style={{
						width: "80px",
						height: "40px",
						border: "2px solid white",
						background: settings.background,
					}}
					onClick={() => setColorPicker(prev => ({ ...prev, background: !prev.background }))}
				/>
				{colorPicker.background && (
					<SketchPicker color={settings.background} onChange={e => handleColorChange(e, "background")} />
				)}
			</div>
			<div>
				<span>Text Color: </span>
				<div
					style={{
						width: "80px",
						height: "40px",
						border: "2px solid white",
						background: settings.color,
					}}
					onClick={() => setColorPicker(prev => ({ ...prev, color: !prev.color }))}
				/>
				{colorPicker.color && <SketchPicker color={settings.color} onChange={e => handleColorChange(e, "color")} />}
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
