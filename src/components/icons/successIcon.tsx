interface SuccessIconProps {
	height: number;
	width: number;
	color: string;
}

export const SuccessIcon = (props: SuccessIconProps) => {
	return (
		<svg
			width={props.width}
			height={props.height}
			viewBox="0 0 40 41"
			fill={props.color}
			xmlns="http://www.w3.org/2000/svg">
			<rect y="0.5" width="40" height="40" rx="20" fill="#DCFCE7" />
			<path
				d="M12.5 21.25L18.5 27.25L27.5 13.75"
				stroke="#22C55E"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
