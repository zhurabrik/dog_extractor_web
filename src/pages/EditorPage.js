import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import Canvas from "../components/Canvas";
import "./EditorPage.css";

const EditorPage = () => {
  const { templateId } = useParams();
  const [canvasData, setCanvasData] = useState(null);
  const [canvasStyle, setCanvasStyle] = useState({});

  useEffect(() => {
    const loadTemplate = () => {
      setCanvasData({
        orientation: templateId === "1" ? "vertical" : "horizontal",
        width: templateId === "1" ? 1080 : 1920,
        height: templateId === "1" ? 1920 : 1080,
        elements: [
          { type: "image", width: "150px", height: "150px", x: 100, y: 100 }, // <-- Можешь поменять эти координаты
          { type: "image", width: "150px", height: "150px", x: 400, y: 100 },
          { type: "text", content: "Текст 1", width: "200px", height: "50px", x: 100, y: 300 },
          { type: "text", content: "Текст 2", width: "200px", height: "50px", x: 400, y: 300 },
        ],
      });
    };

    loadTemplate();
  }, [templateId]);

  useEffect(() => {
    if (canvasData) {
      const toolbarWidth = 200;
      const screenWidth = window.innerWidth - toolbarWidth;
      const screenHeight = window.innerHeight;

      const scale = Math.min(screenWidth / canvasData.width, screenHeight / canvasData.height);

      setCanvasStyle({
        width: canvasData.width * scale,
        height: canvasData.height * scale,
        position: "relative",
        overflow: "hidden",
      });
    }
  }, [canvasData]);

  const handleUpdateElement = (index, updates) => {
    setCanvasData((prev) => {
      const updatedElements = [...prev.elements];
      updatedElements[index] = { ...updatedElements[index], ...updates };
      return { ...prev, elements: updatedElements };
    });
  };

  if (!canvasData) return <p>Загрузка шаблона...</p>;

  return (
    <div className="editor-page">
      <Toolbar />
      <div className="canvas-wrapper">
        <Canvas
          canvasStyle={canvasStyle}
          canvasData={canvasData}
          onUpdateElement={handleUpdateElement}
        />
      </div>
    </div>
  );
};

export default EditorPage;
