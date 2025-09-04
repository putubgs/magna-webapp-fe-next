interface LeftArrowIconProps {
	height: number;
	width: number;
	fill: string;
}

export const LeftArrowIcon = (props: LeftArrowIconProps) => {
	return (
		<svg
			height={props.height}
			width={props.width}
			viewBox="0 0 19 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0.225 8.55866L7.3406 15.7774C7.65 16.0867 8.1312 16.0867 8.4406 15.7774C8.75 15.468 8.75 14.9867 8.4406 14.6774L2.6656 8.79926L17.275 8.79926C17.6875 8.79926 18.0312 8.45546 18.0312 8.04296C18.0312 7.63046 17.6875 7.25236 17.275 7.25236L2.5969 7.25236L8.4406 1.30546C8.75 0.996065 8.75 0.514864 8.4406 0.205464C8.3031 0.0679646 8.0969 -0.000734329 7.8906 -0.000734329C7.6844 -0.000734329 7.4781 0.0679636 7.3406 0.239863L0.225 7.45866C-0.0844002 7.76796 -0.0844002 8.24926 0.225 8.55866Z"
				fill={props.fill}
			/>
		</svg>
	);
};
