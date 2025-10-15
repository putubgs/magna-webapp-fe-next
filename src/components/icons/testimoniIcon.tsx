interface TestimoniIconProps {
	className: string;
	color: string;
}

export const TestimoniIcon = (props: TestimoniIconProps) => {
	return (
		<svg
			className={props.className}
			viewBox="0 0 24 25"
			fill={props.color}
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4 3.5H16C16.55 3.5 17.02 3.7 17.41 4.09C17.8 4.48 18 4.95 18 5.5V12.5C18 13.05 17.8 13.52 17.41 13.91C17.02 14.3 16.55 14.5 16 14.5H15L10 19.5V14.5H4C3.45 14.5 2.98 14.3 2.59 13.91C2.2 13.52 2 13.05 2 12.5V5.5C2 4.95 2.2 4.48 2.59 4.09C2.98 3.7 3.45 3.5 4 3.5ZM15 5.5H4V6.5H15V5.5ZM16 8.5H4V9.5H16V8.5ZM13 11.5H4V12.5H13V11.5Z"
				fill={props.color}
			/>
		</svg>
	);
};
