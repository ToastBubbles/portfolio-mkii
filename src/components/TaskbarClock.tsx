import { useEffect, useState } from "react";

export default function TaskbarClock() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
      const minutes = now.getMinutes().toString().padStart(2, "0"); // Ensure two digits
      const ampm = now.getHours() >= 12 ? "PM" : "AM"; // Determine AM/PM
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    }, 1000); // Update time every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []); // Run effect only once on component mount
  const playDingSound = () => {
    const audio = new Audio("/ding.wav");
    audio.play();
  };
  return (
    <div className="tb-clock">
      <img
        onClick={playDingSound}
        className="clickable"
        src="/speaker.png"
      ></img>
      <div
        className="font-old"
        style={{ margin: "0 0.5em", pointerEvents: "none" }}
      >
        {currentTime}
      </div>
    </div>
  );
}
