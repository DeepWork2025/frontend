import React from "react";
import styles from "./TimeAxis.module.css";

const TimeAxis: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, hour) => hour);

  return (
    <div className={styles.timeBlockContainer}>
      {hours.map((hour) => (
        <div className={styles.timeZone} key={hour}>
          {/* Hour */}
          <div className={styles.timeLabel}>
            {hour === 0
              ? "12 AM"
              : hour < 12
              ? `${hour} AM`
              : hour === 12
              ? "12 PM"
              : `${hour - 12} PM`}
          </div>
          {/* Axis */}
          <div className={styles.timeLine}></div>
        </div>
      ))}
    </div>
  );
};

export default TimeAxis;
