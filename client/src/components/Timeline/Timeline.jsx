import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  List,
  Clock,
} from "lucide-react";

const localizer = momentLocalizer(moment);

export default function Timeline({ groupId }) {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      if (!groupId) return;

      try {
        setLoading(true);
        setError(null);

        const [tasksRes, meetingsRes] = await Promise.all([
          axiosInstance.get(`/api/tasks/${groupId}`),
          axiosInstance.get(`/api/meetings/group/${groupId}`),
        ]);

        const taskEvents = tasksRes.data
          .filter((task) => task.dueDate)
          .map((task) => ({
            id: task._id,
            title: `📝 ${task.title}`,
            start: new Date(task.dueDate),
            end: new Date(task.dueDate),
            allDay: false,
            type: "task",
            status: task.status,
          }));

        const meetingEvents = meetingsRes.data
          .filter((meeting) => meeting.scheduledAt)
          .map((meeting) => ({
            id: meeting._id,
            title: `📅 ${meeting.title}`,
            start: new Date(meeting.scheduledAt),
            end: new Date(
              new Date(meeting.scheduledAt).getTime() + 60 * 60 * 1000
            ),
            allDay: false,
            type: "meeting",
            status: meeting.status,
          }));

        setEvents([...taskEvents, ...meetingEvents]);
      } catch (err) {
        setError("Failed to load timeline events.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [groupId]);

  const handleNavigate = (action) => {
    const newDate = moment(date)
      [action](1, view === "month" ? "months" : "weeks")
      .toDate();
    setDate(newDate);
  };

  const handleToday = () => setDate(new Date());

  if (loading)
    return <div className="p-4 text-gray-500">Loading timeline...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-4 bg-white dark:bg-background-dark shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-bold flex font-mono items-center gap-2 text-text-light dark:text-text-dark">
          <CalendarDays className="w-6 h-6 text-blue-500" />
            Timeline
        </h2>

        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => handleNavigate("subtract")}
            className="px-3 py-1 bg-muted-light dark:bg-muted-dark rounded border border-border-light dark:border-border-dark"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={handleToday}
            className="px-4 py-1 text-sm bg-muted-light dark:bg-muted-dark rounded border border-border-light dark:border-border-dark"
          >
            Today
          </button>

          <button
            onClick={() => handleNavigate("add")}
            className="px-3 py-1 bg-muted-light dark:bg-muted-dark rounded border border-border-light dark:border-border-dark"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="flex gap-1 ml-4">
            {[
              { key: "month", label: "Month", icon: CalendarDays },
              { key: "week", label: "Week", icon: List },
              { key: "day", label: "Day", icon: Clock },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`px-3 py-1 flex items-center gap-1 text-sm rounded border ${
                  view === key
                    ? "bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                    : "bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark"
                }`}
              >
                <Icon className="w-6 h-6" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[500px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={date}
          view={view}
          onView={setView}
          onNavigate={setDate}
          views={["month", "week", "day"]} // ensure all views you support are listed here
          popup
          toolbar={false} // ✅ disables the default toolbar
          style={{ height: "100%" }}
          eventPropGetter={(event) => {
            let backgroundColor;
          
            if (event.type === "task") {
              backgroundColor = event.status === "completed" ? "#22c55e" : "#ef4444"; // ✅ red for incomplete, green for completed
            } else if (event.type === "meeting") {
              backgroundColor = event.status === "ended" ? "#22c55e" : "#3b82f6"; // blue for active, green for ended
            }
          
            return {
              style: {
                backgroundColor,
                borderRadius: "6px",
                color: "#fff",
                padding: "4px",
              },
            };
          }}
        />
      </div>
    </div>
  );
}
