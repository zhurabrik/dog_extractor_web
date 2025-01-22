import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditorPage.css";

const EditorPage = () => {
    const { templateId } = useParams(); // Получаем ID шаблона из URL
    const [canvasData, setCanvasData] = useState(null); // Данные холста
    const [canvasStyle, setCanvasStyle] = useState({}); // Стили холста для масштабирования

    useEffect(() => {
        // Загрузка данных макета при открытии страницы
        const loadTemplate = () => {
            if (templateId === "1") {
                setCanvasData({
                    orientation: "vertical",
                    width: 1080,
                    height: 1920,
                    elements: [
                        { type: "image", width: "33%", height: "auto", x: "33%", y: "40%" },
                        { type: "image", width: "33%", height: "auto", x: "66%", y: "40%" },
                        { type: "text", content: "Текст под первой картинкой", x: "33%", y: "70%" },
                        { type: "text", content: "Текст под второй картинкой", x: "66%", y: "70%" },
                    ],
                });
            } else if (templateId === "2") {
                setCanvasData({
                    orientation: "horizontal",
                    width: 1920,
                    height: 1080,
                    elements: [
                        { type: "image", width: "33%", height: "auto", x: "20%", y: "40%" },
                        { type: "image", width: "33%", height: "auto", x: "60%", y: "40%" },
                        { type: "text", content: "Текст под первой картинкой", x: "20%", y: "70%" },
                        { type: "text", content: "Текст под второй картинкой", x: "60%", y: "70%" },
                    ],
                });
            }
        };

        loadTemplate();
    }, [templateId]);

    useEffect(() => {
        // Рассчитываем масштаб холста в зависимости от размера экрана
        if (canvasData) {
            const screenWidth = window.innerWidth * 0.9; // 90% ширины экрана
            const screenHeight = window.innerHeight * 0.8; // 80% высоты экрана
            const scale = Math.min(screenWidth / canvasData.width, screenHeight / canvasData.height);

            setCanvasStyle({
                width: canvasData.width * scale,
                height: canvasData.height * scale,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
            });
        }
    }, [canvasData]);

    if (!canvasData) return <p>Загрузка шаблона...</p>;

    return (
        <div className="editor-page">
            <div className="canvas-container">
                <div
                    className="canvas"
                    style={{
                        ...canvasStyle,
                        backgroundColor: "#f0f0f0",
                        position: "relative",
                    }}
                >
                    {canvasData.elements.map((el, index) => {
                        if (el.type === "image") {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        position: "absolute",
                                        width: el.width,
                                        height: el.height,
                                        top: el.y,
                                        left: el.x,
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
                                        top: el.y,
                                        left: el.x,
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
