import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event } from '../types';

interface EventsContextValue {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
  updateEvent: (event: Event) => void;
}

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Event) => {
    console.log('Adding event:', event);
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const updateEvent = (updatedEvent: Event) => {
    console.log('Updating event:', updatedEvent);
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  const removeEvent = (id: string) => {
    console.log('Removing event with id:', id);
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, removeEvent, updateEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = (): EventsContextValue => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};