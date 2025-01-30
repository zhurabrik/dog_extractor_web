import React from "react";
import { Rnd } from "react-rnd";

const Element = ({ el, index, onUpdate, selectedElement, setSelectedElement }) => {
    return (
        <Rnd
            size={{
                width: parseInt(el.width) || 100,
                height: parseInt(el.height) || 50,
            }}
            position={{
                x: parseInt(el.x) || 50,
                y: parseInt(el.y) || 50,
            }}
            onMouseDown={() => setSelectedElement(index)}
            onDragStop={(e, d) => {
                onUpdate(index, {
                    x: d.x,
                    y: d.y,
                });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                const newWidth = parseInt(ref.style.width);
                const newHeight = parseInt(ref.style.height);

                onUpdate(index, {
                    width: `${newWidth}px`,
                    height: `${newHeight}px`,
                });
            }}
            bounds="parent"
            enableResizing={{
                top: false,
                right: false,
                bottom: false,
                left: false,
                topLeft: false,
                topRight: false,
                bottomLeft: false,
                bottomRight: true, // Оставляем только правый нижний угол
            }}
            style={{
                border: selectedElement === index ? "1px solid blue" : "none",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: el.type === "image" ? "#ddd" : "transparent",
                outline: "none",
            }}
            tabIndex={0}
        >
            {el.type === "text" ? el.content : "Картинка"}

            {/* Видимая ручка в правом нижнем углу */}
            {selectedElement === index && (
                <div
                    style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "blue",
                        position: "absolute",
                        bottom: "-6px",
                        right: "-6px",
                        borderRadius: "50%",
                        cursor: "nwse-resize",
                    }}
                />
            )}
        </Rnd>
    );
};

export default Element;