interface ApprovedIconProps {
	height: number;
	width: number;
	color: string;
}

export const ApprovedIcon = (props: ApprovedIconProps) => {
	return (
		<svg
			width={props.width}
			height={props.height}
			viewBox="0 0 17 16"
			fill={props.color}
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6.49937 13.6134L2.35938 9.47342L4.24604 7.58675L6.49937 9.84675L13.086 3.25342L14.9727 5.14008L6.49937 13.6134Z"
				fill={props.color}
			/>
		</svg>
	);
};
