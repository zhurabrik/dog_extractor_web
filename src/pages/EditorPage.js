import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Toolbar from "../components/Toolbar"; // Панель инструментов
import "./EditorPage.css";

const EditorPage = () => {
  const { templateId } = useParams(); // Получаем ID шаблона из URL
  const [canvasData, setCanvasData] = useState(null); // Данные макета
  const [canvasStyle, setCanvasStyle] = useState({}); // Стили холста

  // Загружаем данные макета
  useEffect(() => {
    const loadTemplate = () => {
      if (templateId === "1") {
        setCanvasData({
          orientation: "vertical",
          width: 1080,
          height: 1920,
          background: "#f0f0f0", // Базовый цвет фона
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
          background: "#f0f0f0",
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

  // Масштабирование холста
  useEffect(() => {
    if (canvasData) {
      const screenWidth = window.innerWidth - 200; // Учитываем ширину панели инструментов
      const screenHeight = window.innerHeight;
      const scale = Math.min(screenWidth / canvasData.width, screenHeight / canvasData.height);

      setCanvasStyle({
        width: canvasData.width * scale,
        height: canvasData.height * scale,
        background: canvasData.background,
        backgroundSize: "cover", // Покрываем весь холст
        backgroundPosition: "center", // Центрируем фон
      });
    }
  }, [canvasData]);

  // Замена фона холста
  const handleReplaceBackground = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCanvasData((prev) => ({
            ...prev,
            background: `url(${e.target.result})`, // Устанавливаем фон как background-image
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSaveProject = () => {
    const projectName = prompt("Введите название проекта:");
    if (projectName) {
      alert(`Проект "${projectName}" сохранен! (пока только имитация)`);
    }
  };

  const handleExportProject = () => {
    alert("Функция экспорта еще в разработке.");
  };

  const handleUndo = () => {
    alert("Отмена действия (в разработке).");
  };

  const handleRedo = () => {
    alert("Повтор действия (в разработке).");
  };

  if (!canvasData) return <p>Загрузка шаблона...</p>;

  return (
    <div className="editor-page">
      {/* Панель инструментов */}
      <Toolbar
        onReplaceBackground={handleReplaceBackground}
        onSaveProject={handleSaveProject}
        onExportProject={handleExportProject}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
      {/* Холст */}
      <div className="canvas-wrapper">
        <div
          className="canvas"
          style={{
            ...canvasStyle,
            position: "relative",
          }}
        >
          {canvasData.elements.map((el, index) => {
            const absoluteX = (parseFloat(el.x) / 100) * canvasStyle.width;
            const absoluteY = (parseFloat(el.y) / 100) * canvasStyle.height;

            if (el.type === "image") {
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    width: el.width,
                    height: el.height,
                    top: absoluteY,
                    left: absoluteX,
                    border: "1px solid black",
                    backgroundColor: "#ddd",
                  }}
                >
                  Картинка
                </div>
              );
            } else if (el.type === "text") {
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    top: absoluteY,
                    left: absoluteX,
                    fontSize: "16px",
                    color: "#000",
                  }}
                >
                  {el.content}
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
