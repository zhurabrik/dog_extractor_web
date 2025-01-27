import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import "./EditorPage.css";

const EditorPage = () => {
  const { templateId } = useParams();
  const [canvasData, setCanvasData] = useState(null);
  const [canvasStyle, setCanvasStyle] = useState({});
  const [draggingElement, setDraggingElement] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadTemplate = () => {
      if (templateId === "1") {
        setCanvasData({
          orientation: "vertical",
          width: 1080,
          height: 1920,
          elements: [
            { type: "image", width: "30%", height: "auto", x: "15%", y: "30%" },
            { type: "image", width: "30%", height: "auto", x: "55%", y: "30%" },
            { type: "text", content: "Текст под первой картинкой", x: "15%", y: "65%" },
            { type: "text", content: "Текст под второй картинкой", x: "55%", y: "65%" },
          ],
        });
      } else if (templateId === "2") {
        setCanvasData({
          orientation: "horizontal",
          width: 1920,
          height: 1080,
          elements: [
            { type: "image", width: "30%", height: "auto", x: "20%", y: "40%" },
            { type: "image", width: "30%", height: "auto", x: "60%", y: "40%" },
            { type: "text", content: "Текст под первой картинкой", x: "20%", y: "65%" },
            { type: "text", content: "Текст под второй картинкой", x: "60%", y: "65%" },
          ],
        });
      }
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

  const handleMouseDown = (event, elementIndex) => {
    setDraggingElement(elementIndex);
    const bounds = event.target.getBoundingClientRect();
    setOffset({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
  };

  const handleMouseMove = (event) => {
    if (draggingElement !== null) {
      const canvasBounds = document.querySelector(".canvas").getBoundingClientRect();

      const newX = ((event.clientX - canvasBounds.left - offset.x) / canvasStyle.width) * 100;
      const newY = ((event.clientY - canvasBounds.top - offset.y) / canvasStyle.height) * 100;

      setCanvasData((prev) => {
        const updatedElements = [...prev.elements];
        const element = updatedElements[draggingElement];

        const elementWidth = parseFloat(element.width) || 0;
        const elementHeight = parseFloat(element.height) || 0;

        const limitedX = Math.min(Math.max(newX, 0), 100 - elementWidth);
        const limitedY = Math.min(Math.max(newY, 0), 100 - elementHeight);

        updatedElements[draggingElement] = {
          ...element,
          x: `${limitedX}%`,
          y: `${limitedY}%`,
        };

        return { ...prev, elements: updatedElements };
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingElement(null);
  };

  if (!canvasData) return <p>Загрузка шаблона...</p>;

  return (
    <div
      className="editor-page"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Toolbar
        onReplaceBackground={() => alert("Заменить фон")}
        onSaveProject={() => alert("Сохранить проект")}
        onExportProject={() => alert("Экспортировать проект")}
        onUndo={() => alert("Отмена")}
        onRedo={() => alert("Повтор")}
      />
      <div className="canvas-wrapper">
        <div className="canvas" style={{ ...canvasStyle }}>
          {canvasData.elements.map((el, index) => {
            const absoluteX = (parseFloat(el.x) / 100) * canvasStyle.width;
            const absoluteY = (parseFloat(el.y) / 100) * canvasStyle.height;

            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  width: el.type === "text" ? "200px" : el.width,
                  height: el.height,
                  top: absoluteY,
                  left: absoluteX,
                  border: "1px solid black",
                  backgroundColor: el.type === "image" ? "#ddd" : "transparent",
                  cursor: "grab",
                }}
                onMouseDown={(e) => handleMouseDown(e, index)}
              >
                {el.type === "text" ? el.content : "Картинка"}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
