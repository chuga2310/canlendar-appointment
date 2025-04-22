import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { EventDropArg, EventInput, EventClickArg } from "@fullcalendar/core";
import "./index.css";
import EventPopover from "../EventPopover";
import { useEvents } from "../../contexts/EventProviders";
import backgroundEvents from "../../constants";

const CalendarComponent: React.FC = () => {
	const calendarRef = useRef<HTMLDivElement>(null);

	const { events, addEvent, updateEvent } = useEvents();
	const [popoverVisible, setPopoverVisible] = useState(false);
	const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 });
	const [editingEventId, setEditingEventId] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [popoverTitle, setPopoverTitle] = useState("");

	const showPopover = (
		x: number,
		y: number,
		title = "",
		date: Date | null = null,
		eventId: string | null = null
	) => {
		setPopoverPos({ x, y });
		setPopoverTitle(title);
		setSelectedDate(date);
		setEditingEventId(eventId);
		setPopoverVisible(true);
	};

	const handleDateClick = (arg: DateClickArg) => {
		showPopover(arg.dayEl.getBoundingClientRect().x, arg.jsEvent.clientY + 20, "", arg.date, null);
	};

	const handleEventClick = (arg: EventClickArg) => {
		showPopover(
			arg.el.getBoundingClientRect().x,
			arg.el.getBoundingClientRect().y + 20,
			arg.event.title,
			arg.event.start!,
			arg.event.id
		);
	};

	const handleSave = (title: string) => {
		if (editingEventId) {
			updateEvent({
				id: editingEventId,
				title,
				start: selectedDate!,
				end: new Date(selectedDate!.getTime() + 15 * 60000)
			});
		} else if (selectedDate) {
			const newId = String(events.length + 1);
			const end = new Date(selectedDate.getTime() + 15 * 60000);
			addEvent({ id: newId, title, start: selectedDate, end });
		}
		setPopoverVisible(false);
	};

	const handleEventDrop = (arg: EventDropArg) => {
		console.log("Event Moved:", arg.event);
	};

	const handleEventResize = (arg: EventResizeDoneArg) => {
		console.log("Event Resized:", arg.event);
	};

	return (
		<div ref={calendarRef} className="calendar-wrapper">
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
				initialView="timeGridWeek"
				headerToolbar={{
					left: "prevYear,prev,next,nextYear today",
					center: "title",
					right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
				}}
				buttonText={{
					today: "Today",
					month: "Month",
					week: "Week",
					day: "Day",
					list: "List"
				}}
				buttonIcons={{
					prev: "chevron-left",
					next: "chevron-right",
					prevYear: "chevrons-left", // double chevron
					nextYear: "chevrons-right" // double chevron
				}}
				slotDuration="00:15:00"
				slotMinTime="08:00:00"
				slotMaxTime="19:00:00"
				events={[...backgroundEvents, ...events]}
				dateClick={handleDateClick}
				eventClick={handleEventClick}
				editable={true}
				eventDrop={handleEventDrop}
				eventResize={handleEventResize}
				selectable={true}
				nowIndicator={true}
				allDaySlot={false}
			/>
			{popoverVisible && (
				<EventPopover
					position={popoverPos}
					initialTitle={popoverTitle}
					onSave={handleSave}
					onClose={() => setPopoverVisible(false)}
				/>
			)}
		</div>
	);
};

export default CalendarComponent;
