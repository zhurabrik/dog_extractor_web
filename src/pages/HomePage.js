import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/templates");
  };

  return (
    <div className="homepage">
      <h1>Добро пожаловать в MyCollage!</h1>
      <button onClick={handleStart} className="start-button">
        Начать
      </button>
    </div>
  );
};

export default HomePage;
