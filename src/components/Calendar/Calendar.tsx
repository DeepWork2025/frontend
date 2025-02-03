import type React from "react";
import { useState } from "react";
import styles from "./Calendar.module.css";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startDay = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear();

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const startingDay = startDay(currentDate);

    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.calendarDay}></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <div
          key={i}
          className={`${styles.calendarDay} ${isToday(i) ? styles.today : ""}`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button onClick={prevMonth}>&lt;</button>
        <h2>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className={styles.calendarWeekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className={styles.calendarDays}>{renderDays()}</div>
    </div>
  );
};

export default Calendar;
