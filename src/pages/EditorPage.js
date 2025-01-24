import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditorPage.css";

const EditorPage = () => {
    const { templateId } = useParams();
    const [canvasData, setCanvasData] = useState(null); // Данные макета
    const [canvasStyle, setCanvasStyle] = useState({}); // Стили холста

    useEffect(() => {
        // Загрузка данных макета
        const loadTemplate = () => {
            if (templateId === "1") {
                setCanvasData({
                    orientation: "vertical",
                    width: 1080,
                    height: 1920,
                    elements: [
                        { type: "image", width: "30%", height: "auto", x: "15%", y: "30%" }, // Картинка 1
                        { type: "image", width: "30%", height: "auto", x: "55%", y: "30%" }, // Картинка 2
                        { type: "text", content: "Текст под первой картинкой", x: "15%", y: "65%" }, // Текст 1
                        { type: "text", content: "Текст под второй картинкой", x: "55%", y: "65%" }, // Текст 2
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
        // Рассчитываем масштабирование
        if (canvasData) {
            const screenWidth = window.innerWidth * 0.9; // 90% ширины экрана
            const screenHeight = window.innerHeight * 0.9; // 90% высоты экрана
            const scale = Math.min(screenWidth / canvasData.width, screenHeight / canvasData.height); // Масштабирование с учетом пропорций

            setCanvasStyle({
                width: canvasData.width * scale, // Масштабируем ширину
                height: canvasData.height * scale, // Масштабируем высоту
            });
        }
    }, [canvasData]);

    if (!canvasData) return <p>Загрузка шаблона...</p>;

    return (
        <div className="editor-page">
            <div className="canvas-wrapper">
                <div
                    className="canvas"
                    style={{
                        ...canvasStyle,
                        backgroundColor: "#f0f0f0",
                        position: "relative",
                    }}
                >
                    {canvasData.elements.map((el, index) => {
                        // Преобразуем проценты в абсолютные координаты
                        const absoluteX = (parseFloat(el.x) / 100) * canvasStyle.width;
                        const absoluteY = (parseFloat(el.y) / 100) * canvasStyle.height;

                        if (el.type === "image") {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        position: "absolute",
                                        width: el.width, // Ширина элемента
                                        height: el.height, // Высота элемента
                                        top: absoluteY, // Абсолютная координата Y
                                        left: absoluteX, // Абсолютная координата X
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
                                        top: absoluteY, // Абсолютная координата Y
                                        left: absoluteX, // Абсолютная координата X
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
