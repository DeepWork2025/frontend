import React from "react";
import Navbar from "../components/navbar/Navbar";
import Calendar from "../components/calendar/Calendar";
import TimeAxis from "../components/timeAxis/TimeAxis";
import Timer from "../components/timer/Timer";
import AddEvent from "../components/addEvent/AddEventButton";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content-container">
        <div className="calendar-panel">
          <Calendar />
          <Timer />
          <AddEvent />
        </div>
        <div className="time-axis-panel">
          <TimeAxis />
        </div>
      </div>
    </div>
  );
};

export default Home;
