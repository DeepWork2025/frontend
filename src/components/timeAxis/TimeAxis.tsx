import React, { useRef, useEffect } from "react";
import styles from "./TimeAxis.module.css";

const TimeAxis: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, hour) => hour);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const scrollOffset = 8 * 50;
      containerRef.current.scrollTop = scrollOffset;
    }
  }, []);

  return (
    <div className={styles.scrollContainer} ref={containerRef}>
      {hours.map((hour) => (
        <div className={styles.timeZone} key={hour}>
          <div className={styles.timeLabel}>
            {hour === 0
              ? "12 AM"
              : hour < 12
              ? `${hour} AM`
              : hour === 12
              ? "12 PM"
              : `${hour - 12} PM`}
          </div>
          <div className={styles.timeLine}></div>
        </div>
      ))}
    </div>
  );
};

export default TimeAxis;
