import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Toolbar from "../components/Toolbar"; // Панель инструментов
import "./EditorPage.css";

const EditorPage = () => {
  const { templateId } = useParams(); // Получаем ID шаблона из URL
  const [canvasData, setCanvasData] = useState(null); // Данные макета
  const [canvasStyle, setCanvasStyle] = useState({}); // Стили холста

  // Загрузка данных макета
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

  // Масштабирование холста
  useEffect(() => {
    if (canvasData) {
      const screenWidth = window.innerWidth - 200; // Учитываем ширину панели инструментов
      const screenHeight = window.innerHeight;
      const scale = Math.min(screenWidth / canvasData.width, screenHeight / canvasData.height);

      setCanvasStyle({
        width: canvasData.width * scale,
        height: canvasData.height * scale,
        position: "relative",
        overflow: "hidden", // Обрезка элементов за пределами холста
      });
    }
  }, [canvasData]);

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
            backgroundElement: {
              src: e.target.result, // Сохраняем Base64 изображение
            },
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  if (!canvasData) return <p>Загрузка шаблона...</p>;

  return (
    <div className="editor-page">
      <Toolbar
        onReplaceBackground={handleReplaceBackground}
        onSaveProject={() => alert("Сохранение еще в разработке")}
        onExportProject={() => alert("Экспорт еще в разработке")}
        onUndo={() => alert("Отмена еще в разработке")}
        onRedo={() => alert("Повтор еще в разработке")}
      />

      <div className="canvas-wrapper">
        <div className="canvas" style={{ ...canvasStyle }}>
          {canvasData.backgroundElement && (
            <img
              src={canvasData.backgroundElement.src}
              alt="Background"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}

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
