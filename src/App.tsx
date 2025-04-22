import React from "react";
import "./App.css";
import CalendarComponent from "./components/CalendarComponent";
import { EventsProvider } from "./contexts/EventProviders";

function App() {
	return (
		<div className="App">
			<h1>Medical Appointment Calendar</h1>
			<EventsProvider>
				<CalendarComponent />
			</EventsProvider>
		</div>
	);
}

export default App;
