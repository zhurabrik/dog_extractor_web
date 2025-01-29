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
        let newX = el.x;
        let newY = el.y;
        let newWidth = parseInt(ref.style.width);
        let newHeight = parseInt(ref.style.height);

        // **ЛОГИКА МАСШТАБИРОВАНИЯ КАК В ГРАФИЧЕСКИХ РЕДАКТОРАХ**
        if (direction.includes("left")) {
          newX = el.x + (parseInt(el.width) - newWidth);
        }
        if (direction.includes("top")) {
          newY = el.y + (parseInt(el.height) - newHeight);
        }

        onUpdate(index, {
          width: `${newWidth}px`,
          height: `${newHeight}px`,
          x: newX,
          y: newY,
        });
      }}
      bounds="parent"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topLeft: true,
        topRight: true,
        bottomLeft: true,
        bottomRight: true,
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
    </Rnd>
  );
};

export default Element;
