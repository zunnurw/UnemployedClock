import React, { useState, useEffect } from "react";
import clockImage from './assets/bdf.gif'; 
import baeksoryu from './assets/baeksoryu.webp'; 
import iconImage from './assets/clock.png'; 

const AnalogClockWithOuterSchedule = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Set favicon
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = iconImage; // Use the imported image
    document.head.appendChild(link);

    // Clean up the link when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Ubah Bahagian Sini Saja Kawan >_<
  const activities = [
    { name: "Sleep", start: 0, end: 9},
    { name: "Subuh", start: 6, end: 7},
    { name: "Breakfast", start: 8, end: 10},
    { name: "Exercises", start: 10, end: 11},
    { name: "Coding", start: 11, end: 13 },
    { name: "Lunch", start: 13, end: 14 },
    { name: "Zuhur", start: 14, end: 15},
    { name: "Free time :)", start: 15, end: 17.5},
    { name: "Asar", start: 17, end: 18},
    { name: "Drama", start: 18, end: 19},
    { name: "Magrhib", start: 19, end: 20},
    { name: "Dinner", start: 20, end: 21},
    { name: "Drama", start: 21, end: 23},
    { name: "Isyak", start: 23, end: 24.5}
  ];

  const secondsDegrees = (time.getSeconds() / 60) * 360;
  const minutesDegrees = ((time.getHours() % 2) * 60 + time.getMinutes()) * 3;
  const hoursDegrees = time.getHours() * 15 + time.getMinutes() / 8;

    // Format time for AM/PM display
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <div className="outer-container ">
      <h2 style={{ margin: 10 }}>UNEMPLOED CLOCK ZUNNUR WAFIY !</h2>
      <p style={{ margin: 0 }}>
        <i>Inspired by Bae Seok Ryu - Love Next Door</i>
      </p>
      <h3 style={{ margin: 10 }}>TODAY'S TIME TABLE</h3>
      <div className="clock-container">
        <div className="clock">
          <img
            src={clockImage} 
            alt="Sleep Activity"
            style={{
              position: "absolute",
              top: "20%", 
              left: "70%",
              width: "100px", 
              height: "100px", 
              transform: "translate(-50%, -50%)", 
              zIndex: 1 
            }}
          />
          {activities.map((activity, index) => {
            const middle = (activity.start + activity.end) / 2;
            const isRightSide = middle >= 2 && middle <= 12;

            return (
              <div key={index}>
                <div
                  className="activity-segment"
                  style={{
                    transform: `rotate(${activity.start * 15}deg)`,
                    height: "170px",
                    transformOrigin: "bottom center",
                    position: "absolute",
                    width: "1px",
                    bottom: "50%",
                    left: "calc(50% - 0.5px)",
                    backgroundColor: "black",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "49%",
                    left: "43%",
                    fontSize: "14px",
                    fontWeight: "bold",
                    transform: `rotate(${
                      middle * 15
                    }deg) translate(0, -120px) rotate(${
                      isRightSide ? "-90deg" : "90deg"
                    })`,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {activity.name}
                </span>
              </div>
            );
          })}

          {[...Array(24)].map((_, index) => {
            const hour = ((index + 23) % 24) + 1;
            return (
              <div
                key={index}
                className="hour-marker"
                style={{
                  transform: `rotate(${index * 15}deg)`,
                  height: "100%",
                  width: "1px",
                  position: "absolute",
                  left: "calc(50% - 0.5px)",
                }}
              >
                <div
                  style={{
                    height: "15px",
                    width: "3px",
                    backgroundColor: "black",
                    borderRadius: "100px",
                    position: "absolute",
                    top: "-10px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "-35px",
                    transform: `rotate(-${index * 15}deg) translate(-50%, 0)`,
                    transformOrigin: "center",
                    fontWeight: "bold",
                    marginTop: "-5px",
                  }}
                >
                  {hour}
                </div>
              </div>
            );
          })}
          
          <div
            className="hand hour-hand"
            style={{ transform: `rotate(${hoursDegrees}deg)` }}
          />
          <div
            className="hand minute-hand"
            style={{ transform: `rotate(${minutesDegrees}deg)` }}
          />
          <div
            className="hand second-hand"
            style={{ transform: `rotate(${secondsDegrees}deg)` }}
          />
          <div className="center-circle">
            <span>PLAY!</span>
          </div>
        </div>
      </div>
      <div className="live-time" style={{textTransform: 'uppercase', position: "absolute", right: "10%", bottom: "60%", fontSize: "50px", fontWeight: "bold"}}>
          {formattedTime}
        </div>
        <div className="lovenextdoor">
          <img
            src={baeksoryu} 
            alt="Love Next Door"
            style={{
              position: "fixed",
              width: "30%", 
              height: "40%", 
              top: "50%",
              right: "2%",
              zIndex: 1,
            }}
          />
          </div>

      <style jsx>{`
        .outer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center; 
          height: 100%; 
          margin-top: 50px;
          font-family: Arial, sans-serif;
        }
        .clock-container {
          margin-top:50px;
          padding: 5px;
          border: 2px solid black;
          border-radius: 50%;
        }
        .clock {
          width: 400px;
          height: 400px;
          border: 2px solid black;
          border-radius: 50%;
          position: relative;
        }
        .hand {
          position: absolute;
          bottom: 50%;
          left: 50%;
          transform-origin: bottom center;
          background-color: black;
        }
        .hour-hand {
          width: 8px;
          height: 80px;
          margin-left: -3px;
          border-radius: 10px;
        }
        .minute-hand {
          border-radius: 10px;
          width: 6px;
          height: 110px;
          margin-left: -2px;
        }
        .second-hand {
          border-radius: 10px;
          width: 4px;
          height: 150px;
          margin-left: -1px;
          background-color: red;
          border-radius:'100%;
        }
        .center-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background-color: orange;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight:bold;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default AnalogClockWithOuterSchedule;
