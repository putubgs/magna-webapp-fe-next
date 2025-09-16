interface DangerIconProps {
	height: number;
	width: number;
	color: string;
}

export const DangerIcon = (props: DangerIconProps) => {
	return (
		<svg
			width={props.width}
			height={props.height}
			viewBox="0 0 36 37"
			fill={props.color}
			xmlns="http://www.w3.org/2000/svg">
			<rect y="0.5" width="36" height="36" rx="18" fill="#FEE2E2" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M26 18.5C26 22.9183 22.4183 26.5 18 26.5C13.5817 26.5 10 22.9183 10 18.5C10 14.0817 13.5817 10.5 18 10.5C22.4183 10.5 26 14.0817 26 18.5ZM18 13.5C18.4142 13.5 18.75 13.8358 18.75 14.25V18.75C18.75 19.1642 18.4142 19.5 18 19.5C17.5858 19.5 17.25 19.1642 17.25 18.75V14.25C17.25 13.8358 17.5858 13.5 18 13.5ZM18 23.5C18.5523 23.5 19 23.0523 19 22.5C19 21.9477 18.5523 21.5 18 21.5C17.4477 21.5 17 21.9477 17 22.5C17 23.0523 17.4477 23.5 18 23.5Z"
				fill={props.color}
			/>
		</svg>
	);
};
