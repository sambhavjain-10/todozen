const Input = ({
	type,
	value,
	setValue,
	name,
	width = "100%",
	height = "40px",
	className,
	showArrows = false,
	theme = "WHITE",
	maxValue = 2147483647,
	minValue = 0,
	...rest
}) => {
	return (
		<input
			value={value}
			onChange={onChange}
			name={name}
			style={{ width, height }}
			type={type}
			className={`${styles.input} ${className ?? ""}  `}
			{...rest}
		/>
	);
};

export default Input;
