# Medical Appointment Calendar

This project is a **Medical Appointment Calendar** application built with React and FullCalendar. It allows users to manage events such as appointments, with features like adding, editing, and removing events.

## Features

- **Interactive Calendar**: View events in different layouts (month, week, day, and list).
- **Event Management**: Add, edit, and delete events.
- **Drag and Drop**: Move events interactively.
- **Persistent Storage**: Events are saved in `localStorage` for persistence.
- **Customizable Time Slots**: Configure time slots and working hours.
- **Popover for Event Editing**: Edit event details using a popover interface.

## Project Structure

```plaintext
calendar-app/
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # React components
│   │   ├── CalendarComponent/  # Calendar UI
│   │   └── EventPopover/       # Event editing popover
│   ├── contexts/       # Context for managing events
│   ├── types.ts        # TypeScript types
│   ├── constants.ts    # Constants (e.g., background events)
│   ├── App.tsx         # Main application component
│   ├── index.tsx       # Entry point
│   └── ...             # Other files
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```
### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd calendar-app

2. Install dependencies: ```npm install```
3. Start dependencies: ```npm start```

### Key Files:

- ```src/components/CalendarComponent```: Implements the calendar UI using FullCalendar.
- ```src/components/EventPopover```: Handles event editing via a popover.
- ```src/contexts/EventProviders.tsx```: Manages event state using React Context and save event to ```localStorage```.
- ```src/types.ts```: Defines TypeScript types for events.
- ```src/constants.ts```: ```backgroundEvents``` for background events (Ex: lunch time, ...)

### Technologies Used
- React: Frontend library for building the UI.
- FullCalendar: Calendar library for event management.
- TypeScript: Strongly typed JavaScript.
- CSS: Styling for components.