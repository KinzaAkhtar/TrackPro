import React from "react";
import { useNavigate } from "react-router-dom";

const TaskCards = () => {
  const navigate = useNavigate();

  const cardData = [
    { title: "To Do", value: 10, bgColor: "bg-red-500", status: "To Do" },
    { title: "In Progress", value: 15, bgColor: "bg-yellow-500", status: "In Progress" },
    { title: "Tasks Completed", value: 75, bgColor: "bg-green-500", status: "Completed" },
    { title: "Total Tasks", value: 100, bgColor: "bg-blue-500", status: "All" },
  ];

  const handleCardClick = (status) => {
    navigate(`/tasks/${status}`);
  };

  return (
    <div className="flex justify-center gap-4 p-4 pl-8 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.status)}
            className={`p-10 rounded-lg shadow-lg text-white ${card.bgColor} flex flex-col items-start cursor-pointer`}
          >
            <h2 className="text-xl font-bold text-left">{card.title}</h2>
            <p className="text-3xl font-semibold text-left">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCards;
