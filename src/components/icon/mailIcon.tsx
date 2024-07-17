import React, { FC } from "react";

interface MailIconProps {
  size?: number;
  color?: string;
}

const MailIcon: FC<MailIconProps> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: size ? `${size}px` : "100px",
      height: "auto",
    }}
    viewBox="0 0 19 14"
    fill="none"
  >
    <path
      d="M16.8125 0.26001C17.7441 0.26001 18.5 1.01439 18.5 1.94498C18.5 2.47505 18.2504 2.97352 17.825 3.29296L10.175 9.02188C9.77422 9.32026 9.22578 9.32026 8.825 9.02188L1.175 3.29296C0.750066 2.97352 0.5 2.47505 0.5 1.94498C0.5 1.01439 1.25551 0.26001 2.1875 0.26001H16.8125ZM8.15 9.92053C8.95156 10.5208 10.0484 10.5208 10.85 9.92053L18.5 4.19162V11.4932C18.5 12.7323 17.491 13.7398 16.25 13.7398H2.75C1.50723 13.7398 0.5 12.7323 0.5 11.4932V4.19162L8.15 9.92053Z"
      fill={color}
    />
  </svg>
);

export default MailIcon;
