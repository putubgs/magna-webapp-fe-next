import { useEffect, useRef, useState, useCallback } from "react";

type DatePickerProps = {
	className?: string;
	date: (date: string) => void;
	open: boolean;
	close: () => void;
	data?: string;
	picked?: string | "date" | "startDate" | "endDate";
	selectedDate?: string;
	selectedStartDate?: string;
	selectedEndDate?: string;
};

export default function DatePicker({
	className,
	date,
	open,
	close,
	data,
	picked = "date",
	selectedDate,
	selectedStartDate,
	selectedEndDate,
}: DatePickerProps) {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedLocalDate, setSelectedLocalDate] = useState<string>(data || "");
	const daysContainerRef = useRef<HTMLDivElement>(null);
	const datepickerContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (open && data) {
			const dateParts = data.split("/");
			if (dateParts.length === 3) {
				const month = parseInt(dateParts[0]) - 1;
				const day = parseInt(dateParts[1]);
				const year = parseInt(dateParts[2]);
				setCurrentDate(new Date(year, month, day));
				setSelectedLocalDate(data);
			}
		}
	}, [open, data]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				datepickerContainerRef.current &&
				!datepickerContainerRef.current.contains(event.target as Node)
			) {
				close();
			}
		}

		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open, close]);

	const disableDate = useCallback(
		(day: number, month: number, year: number) => {
			const currentDateRealFormat = new Date(year, month, day);
			const today = new Date();
			const todayDate = today.getDate();
			const todayMonth = today.getMonth();
			const todayYear = today.getFullYear();

			const pastDate =
				year < todayYear ||
				(year === todayYear && month < todayMonth) ||
				(year === todayYear && month === todayMonth && day < todayDate);

			if (pastDate) return true;

			if (picked == "startDate" || picked == "endDate") {
				if (selectedDate) {
					const [selectedMonth, selectedDay, selectedYear] = selectedDate
						.split("/")
						.map(Number);
					const selectedDateRealFormat = new Date(
						selectedYear,
						selectedMonth - 1,
						selectedDay
					);

					if (
						day == selectedDay &&
						month == selectedMonth - 1 &&
						year == selectedYear
					) {
						return true;
					} else {
						if (currentDateRealFormat <= selectedDateRealFormat) {
							return true;
						}
					}
				}
			}

			if (picked == "endDate") {
				if (selectedStartDate) {
					const [startMonth, startDay, startYear] = selectedStartDate
						.split("/")
						.map(Number);
					const startDateRealFormat = new Date(startYear, startMonth - 1, startDay);

					if (selectedDate) {
						const [selectedMonth, selectedDay, selectedYear] = selectedDate
							.split("/")
							.map(Number);
						const selectedDateRealFormat = new Date(
							selectedYear,
							selectedMonth - 1,
							selectedDay
						);

						if (
							currentDateRealFormat >= selectedDateRealFormat &&
							currentDateRealFormat <= startDateRealFormat
						) {
							return true;
						} else {
							if (currentDateRealFormat <= startDateRealFormat) {
								return true;
							}
						}
					}
				}
			}

			return false;
		},
		[picked, selectedDate, selectedStartDate]
	);

	const renderCalendar = useCallback(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		const daysContainer = daysContainerRef.current;
		if (!daysContainer) return;

		daysContainer.innerHTML = "";

		const firstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

		for (let i = 0; i < firstDay; i++) {
			const emptyDiv = document.createElement("div");
			daysContainer.appendChild(emptyDiv);
		}

		for (let i = 1; i <= daysInMonth; i++) {
			const dayDiv = document.createElement("div");
			const isDisabled = disableDate(i, month, year);

			if (isDisabled) {
				dayDiv.className =
					"flex h-[38px] w-[38px] items-center justify-center rounded-[7px] border-[.5px] border-transparent text-gray-700 cursor-not-allowed opacity-50 sm:h-[46px] sm:w-[47px] mb-2";
			} else {
				dayDiv.className =
					"cursor-pointer flex h-[38px] w-[38px] items-center justify-center rounded-[7px] border-[.5px] border-transparent text-white hover:border-stroke hover:bg-gray-2 sm:h-[46px] sm:w-[47px] dark:text-white dark:hover:border-dark-3 dark:hover:bg-dark mb-2";

				const isDaySelected = selectedLocalDate === `${month + 1}/${i}/${year}`;
				if (isDaySelected) {
					dayDiv.classList.add("bg-violet-800", "text-white");
				}

				dayDiv.addEventListener("click", () => {
					const selectedDateValue = `${month + 1}/${i}/${year}`;
					setSelectedLocalDate(selectedDateValue);

					if (daysContainer) {
						daysContainer
							.querySelectorAll("div")
							.forEach((d) => d.classList.remove("bg-violet-800", "text-white"));
						dayDiv.classList.add("bg-violet-800", "text-white");
					}
				});
			}
			dayDiv.textContent = i.toString();
			daysContainer.appendChild(dayDiv);
		}
	}, [currentDate, selectedLocalDate, disableDate]);

	useEffect(() => {
		if (open && daysContainerRef.current) {
			renderCalendar();
		}
	}, [open, renderCalendar]);

	const handlePrevMonth = () => {
		setCurrentDate((prevDate) => {
			const newDate = new Date(prevDate);
			newDate.setMonth(newDate.getMonth() - 1);
			return newDate;
		});
	};

	const handleNextMonth = () => {
		setCurrentDate((prevDate) => {
			const newDate = new Date(prevDate);
			newDate.setMonth(newDate.getMonth() + 1);
			return newDate;
		});
	};

	const handleApply = () => {
		if (selectedLocalDate) {
			close();
			date(selectedLocalDate);
		}
	};

	if (!open) return null;

	return (
		<div className={`${className} absolute w-[250px] sm:w-[350px] md:w-[400px]`}>
			<div
				ref={datepickerContainerRef}
				id="datepicker-container"
				className="absolute z-10 flex w-full flex-col rounded-xl bg-black p-4 shadow-four sm:p-[30px] dark:bg-dark-2 dark:shadow-box-dark">
				<div className="flex items-center justify-between pb-4">
					<div
						id="prevMonth"
						className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[7px] border-[.5px] border-stroke bg-gray-2 text-dark sm:h-[46px] sm:w-[46px] dark:border-dark-3 dark:bg-dark"
						onClick={handlePrevMonth}>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="fill-current w-3 sm:w-5">
							<path d="M16.2375 21.4875C16.0125 21.4875 15.7875 21.4125 15.6375 21.225L7.16249 12.6C6.82499 12.2625 6.82499 11.7375 7.16249 11.4L15.6375 2.77498C15.975 2.43748 16.5 2.43748 16.8375 2.77498C17.175 3.11248 17.175 3.63748 16.8375 3.97498L8.96249 12L16.875 20.025C17.2125 20.3625 17.2125 20.8875 16.875 21.225C16.65 21.375 16.4625 21.4875 16.2375 21.4875Z" />
						</svg>
					</div>

					<span
						id="currentMonth"
						className="text-xs sm:text-base md:text-xl font-medium capitalize text-dark dark:text-black">
						{currentDate.toLocaleDateString("en-US", {
							month: "long",
							year: "numeric",
						})}
					</span>

					<div
						id="nextMonth"
						className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[7px] border-[.5px] border-stroke bg-gray-2 text-dark sm:h-[46px] sm:w-[46px] dark:border-dark-3 dark:bg-dark dark:text-black"
						onClick={handleNextMonth}>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="fill-current w-3 sm:w-5">
							<path d="M7.7625 21.4875C7.5375 21.4875 7.35 21.4125 7.1625 21.2625C6.825 20.925 6.825 20.4 7.1625 20.0625L15.0375 12L7.1625 3.97498C6.825 3.63748 6.825 3.11248 7.1625 2.77498C7.5 2.43748 8.025 2.43748 8.3625 2.77498L16.8375 11.4C17.175 11.7375 17.175 12.2625 16.8375 12.6L8.3625 21.225C8.2125 21.375 7.9875 21.4875 7.7625 21.4875Z" />
						</svg>
					</div>
				</div>
				<div className="grid grid-cols-7 justify-between text-center pb-2 pt-4 text-xs sm:text-sm font-medium capitalize text-body-color dark:text-dark-6">
					<span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]">
						Mo
					</span>

					<span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]">
						Tu
					</span>

					<span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]">
						We
					</span>

					<span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]">
						Th
					</span>

					<span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]">
						Fr
					</span>

					<span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]">
						Sa
					</span>

					<span className="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]">
						Su
					</span>
				</div>

				<div
					ref={daysContainerRef}
					id="days-container"
					className="grid grid-cols-7 text-center text-xs sm:text-sm font-medium"></div>

				<div className="flex items-center pt-4 gap-x-3">
					<div
						id="cancelBtn"
						className="cursor-pointer flex h-[40px] sm:h-[50px] w-full items-center border justify-center rounded-md bg-transparent text-xs sm:text-base font-medium text-white"
						onClick={() => close()}>
						Cancel
					</div>
					<div
						id="applyBtn"
						className={`flex h-[40px] sm:h-[50px] w-full items-center justify-center rounded-md ${
							selectedLocalDate
								? "cursor-pointer bg-violet-800"
								: "bg-transparent text-transparent"
						} text-xs sm:text-base font-medium text-white`}
						onClick={handleApply}>
						Done
					</div>
				</div>
			</div>
		</div>
	);
}
