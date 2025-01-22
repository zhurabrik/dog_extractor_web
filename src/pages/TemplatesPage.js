import React from "react";
import { useNavigate } from "react-router-dom";
import "./TemplatesPage.css";

const TemplatesPage = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    // Перейти на редактор с выбранным шаблоном
    navigate(`/editor/${templateId}`);
  };

  return (
    <div className="templates-page">
      <h1>Выберите макет для вашего коллажа</h1>
      <div className="templates">
        {/* Макет 1 */}
        <div className="template">
          <div className="template-preview template-1"></div>
          <button onClick={() => handleTemplateSelect(1)}>Выбрать Макет 1</button>
        </div>
        {/* Макет 2 */}
        <div className="template">
          <div className="template-preview template-2"></div>
          <button onClick={() => handleTemplateSelect(2)}>Выбрать Макет 2</button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
