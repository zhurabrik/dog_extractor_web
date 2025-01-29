import React, { useState } from "react";
import Element from "./Element";

const Canvas = ({ canvasStyle, canvasData, onUpdateElement }) => {
  const [selectedElement, setSelectedElement] = useState(null); // Выделенный элемент

  return (
    <div className="canvas" style={canvasStyle}>
      {/* Фон холста */}
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

      {/* Элементы холста */}
      {canvasData.elements.map((el, index) => (
        <Element
          key={index}
          el={el}
          index={index}
          onUpdate={onUpdateElement}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />
      ))}
    </div>
  );
};

export default Canvas;
