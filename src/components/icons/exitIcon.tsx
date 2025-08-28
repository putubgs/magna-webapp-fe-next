import { FC } from "react";

interface ExitIconProps {
	size?: number;
	color?: string;
	onClick?: () => void;
  className?: string;
}

const ExitIcon: FC<ExitIconProps> = ({ size, color, onClick, className }) => (
	<svg
		className={className}
		onClick={onClick}
		style={{
			width: size ? `${size}px` : "100px",
			height: "auto",
			cursor: "pointer",
		}}
		viewBox="0 0 16 16"
		fill={color}
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M8 8L15 15M8 8L1 1M8 8L1 15M8 8L15 1"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default ExitIcon;
