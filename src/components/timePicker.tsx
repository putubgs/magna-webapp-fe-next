import { useState, useEffect, useRef } from "react";

type TimePickerProps = {
	time: (time: string) => void;
	open: boolean;
	close: () => void;
	data?: string;
};

const generateTimeOptions = (interval: number) => {
	const options = [];
	const startTime = new Date();
	startTime.setHours(0, 0, 0, 0);
	for (let i = 0; i < 24 * 60; i += interval) {
		const time = new Date(startTime.getTime() + i * 60000);
		const hour = time.getHours() % 12 || 12;
		const minute = time.getMinutes().toString().padStart(2, "0");
		const period = time.getHours() < 12 ? "AM" : "PM";
		options.push({ hour: hour.toString().padStart(2, "0"), minute, period });
	}
	return options;
};

export default function TimePicker({
	time,
	open,
	close,
	data,
}: TimePickerProps) {
	const [selectedTime, setSelectedTime] = useState("");
	const timepickerRef = useRef(null);
	const [times] = useState(generateTimeOptions(15));

	const handleTimeSelection = (hour: string, minute: string, period: string) => {
		setSelectedTime(`${hour} ${minute} ${period}`);
		time(`${hour} ${minute} ${period}`);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				timepickerRef.current &&
				!(timepickerRef.current as Node).contains(event.target as Node)
			) {
				close();
			}
		};

		if (open) {
			document.addEventListener("mousedown", handleClickOutside);

			if (data) {
				console.log(data);
				setSelectedTime(data);
			}
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open, close, data]);

	if (!open) return null;

	return (
		<>
			<style>
				{`
          /* Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}
			</style>

			<div className="cursor-pointer relative w-full px-4">
				<div
					ref={timepickerRef}
					className="shadow-datepicker no-scrollbar absolute z-10 left-0 mt-2 h-[262px] w-[120px] sm:w-[162px] overflow-hidden overflow-y-auto rounded-md bg-black p-2">
					{times.map((time, index) => {
						const timeString = `${time.hour} ${time.minute} ${time.period}`;
						const isSelected = timeString === selectedTime;
						return (
							<div
								key={index}
								className={`time-option flex cursor-pointer justify-between gap-1 rounded-md transition ${
									isSelected ? "selected-time" : ""
								}`}
								onClick={() =>
									handleTimeSelection(time.hour, time.minute, time.period)
								}>
								<div
									className={`hour flex h-[30px] sm:h-[46px] w-[46px] items-center justify-center rounded-md text-xs sm:text-sm font-medium ${
										isSelected ? "bg-violet-800" : "text-dark-3 dark:text-dark-6"
									}`}>
									{time.hour}
								</div>
								<div
									className={`minute flex h-[30px] sm:h-[46px] w-[46px] items-center justify-center rounded-md text-xs sm:text-sm font-medium ${
										isSelected ? "bg-violet-800" : "text-dark-3 dark:text-dark-6"
									}`}>
									{time.minute}
								</div>
								<div
									className={`period flex h-[30px] sm:h-[46px] w-[46px] items-center justify-center rounded-md text-xs sm:text-sm font-medium ${
										isSelected ? "bg-violet-800" : "text-dark-3 dark:text-dark-6"
									}`}>
									{time.period}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
