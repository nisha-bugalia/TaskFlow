import React, { useEffect, useState } from "react";

function Timeline({ tasks = [] }) {
  const [timeline, setTimeline] = useState([]);
  const colors = ["#02e075", "#fc034a", "darkorange", "#a103fc", "indigo"];

  const generateTimeline = () => {
    try {
      const now = new Date();
      const localTimeString = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
      });
      
      // Safely extract hour from time string
      const currentHour = parseInt(localTimeString.split(" ")[0]) || 0;
      const hoursLeft = 24 - currentHour;
      
      const timeSlots = Array.from({ length: hoursLeft }, (_, i) => {
        const hour = (currentHour + i) % 24;
        return `${hour.toString().padStart(2, "0")}:00`;
      });

      setTimeline(timeSlots);
    } catch (error) {
      console.error("Error generating timeline:", error);
      setTimeline([]);
    }
  };

  useEffect(() => {
    generateTimeline();
  }, []);

  const generateDates = () => {
    try {
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.getDate().toString();
      });
    } catch (error) {
      console.error("Error generating dates:", error);
      return [];
    }
  };

  const generateDays = () => {
    try {
      return Array.from({ length: 7 }, (_, i) => {
        const day = (new Date().getDay() + i) % 7;
        switch (day) {
          case 1: return "MON";
          case 2: return "TUES";
          case 3: return "WED";
          case 4: return "THR";
          case 5: return "FRI";
          case 6: return "SAT";
          case 0: return "SUN";
          default: return "";
        }
      });
    } catch (error) {
      console.error("Error generating days:", error);
      return [];
    }
  };

  const dates = generateDates();
  const days = generateDays();

  if (!timeline.length || !dates.length || !days.length) {
    return <div className="p-4 text-gray-500">Loading timeline...</div>;
  }

  return (
    <div className="flex-col flex p-3 pt-0 pb-0 bg-white rounded-lg w-full gap-5 relative h-96 overflow-y-scroll text-black">
      <div className="font-bold text-xl sticky bg-white w-[100%] p-6 pl-0 top-0 z-40">
        Project Timeline
      </div>
      <div className="flex flex-col">
        {timeline.map((time, i) => (
          <div key={`time-${i}`} className="h-[3rem] flex gap-7">
            <div className="font-bold text-gray-500">{time}</div>
            <div
              className="grow"
              style={{
                borderTop: "2px dotted gray",
                margin: "20px 0",
              }}
            />
          </div>
        ))}
      </div>

      {tasks.map((task) => {
        try {
          const startDate = new Date(task.startDate);
          const dueDate = new Date(task.dueDate);
          
          if (isNaN(startDate) || isNaN(dueDate)) {
            console.error("Invalid date for task:", task);
            return null;
          }

          const pos = {
            left: `${
              5 + 7 * (startDate.getDate() - parseInt(dates[0]))
            }rem`,
            top: `${
              5 + 
              3 * (startDate.getHours() - parseInt(timeline[0]?.split(":")[0] || 0)) +
              (3 / 60) * startDate.getMinutes()
            }rem`,
          };

          return (
            <div
              key={task._id}
              className="absolute h-[2.8rem] flex items-center p-2 z-30 rounded-xl text-white font-medium cursor-pointer"
              style={{
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                width: `${6 * (dueDate.getDate() - startDate.getDate())}rem`,
                top: pos.top,
                left: pos.left,
              }}
            >
              <span className="truncate block w-full">{task.title}</span>
            </div>
          );
        } catch (error) {
          console.error("Error rendering task:", task, error);
          return null;
        }
      })}

      <div className="sticky bottom-0 ml-[3.8rem] bg-white z-40 p-2 flex justify-around">
        {dates.map((d, index) => (
          <div key={`date-${index}`} className="w-[7rem] flex-col relative flex items-center">
            {index === 0 && (
              <div className="absolute bottom-[2rem] flex-col justify-center items-center gap-0 flex z-10">
                <div className="h-64 bg-purple-600 w-[3px] rounded-full"></div>
                <div className="w-5 h-5 rounded-full bg-purple-600"></div>
              </div>
            )}
            <div className="font-bold text-gray-400">
              {d} {days[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;