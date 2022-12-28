import { activeAtom, categoriesAtom } from "@atoms";
import { useRecoilState } from "recoil";
import styles from "./Overview.module.scss";

const Overview = () => {
	const [categories, setCategories] = useRecoilState(categoriesAtom);
	const [active, setActive] = useRecoilState(activeAtom);

	return (
		<div>
			<div>Categories</div>
			<div className={styles.categories}>
				{categories.map(cat => (
					<span key={cat.name} style={{ background: cat.background }}>
						{cat.name}
					</span>
				))}
			</div>
		</div>
	);
};

export default Overview;
