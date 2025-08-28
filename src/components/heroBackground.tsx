export const HeroBackground = ({ haxColor }: { haxColor?: string }) => {
	return (
		<>
			<svg
				className="hidden md:block absolute -z-10 left-0 bottom-0 object-cover"
				viewBox="0 0 1440 778"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<g filter="url(#filter0_f_680_480)">
					<ellipse
						cx="710"
						cy="749.5"
						rx="583"
						ry="621.5"
						fill={haxColor ?? "#C95454"}
						fill-opacity="0.25"
					/>
				</g>
				<defs>
					<filter
						id="filter0_f_680_480"
						x="-73"
						y="-72"
						width="1566"
						height="1643"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="BackgroundImageFix"
							result="shape"
						/>
						<feGaussianBlur
							stdDeviation="100"
							result="effect1_foregroundBlur_680_480"
						/>
					</filter>
				</defs>
			</svg>
			<svg
				className="block md:hidden absolute -z-10 left-0 bottom-0 object-cover w-full"
				width="390"
				height="408"
				viewBox="0 150 390 408"
				fill={haxColor ?? "#C95454"}
				xmlns="http://www.w3.org/2000/svg">
				<g filter="url(#filter0_f_6_6305)">
					<ellipse
						cx="195"
						cy="461.5"
						rx="245"
						ry="261.5"
						fill={haxColor ?? "#C95454"}
						fill-opacity="0.25"
					/>
				</g>
				<defs>
					<filter
						id="filter0_f_6_6305"
						x="-250"
						y="0"
						width="890"
						height="923"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="BackgroundImageFix"
							result="shape"
						/>
						<feGaussianBlur
							stdDeviation="100"
							result="effect1_foregroundBlur_6_6305"
						/>
					</filter>
				</defs>
			</svg>
		</>
	);
};
