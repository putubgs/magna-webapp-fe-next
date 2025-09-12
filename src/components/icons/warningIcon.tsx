interface WarningIconProps {
	height: number;
	width: number;
	color: string;
}

export const WarningIcon = (props: WarningIconProps) => {
	return (
		<svg
			width={props.width}
			height={props.height}
			viewBox="0 0 40 41"
			fill={props.color}
			xmlns="http://www.w3.org/2000/svg">
			<rect y="0.5" width="40" height="40" rx="20" fill={props.color} />
			<path
				d="M19.9998 17.5004V21.2504M10.6965 24.6261C9.83114 26.1261 10.9137 28.0004 12.6454 28.0004H27.3541C29.0858 28.0004 30.1684 26.1261 29.303 24.6261L21.9487 11.8786C21.0828 10.3777 18.9167 10.3777 18.0509 11.8786L10.6965 24.6261ZM19.9998 24.2504H20.0073V24.2579H19.9998V24.2504Z"
				stroke="#EAB308"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
