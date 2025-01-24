import React from "react";
import "./Toolbar.css";

const Toolbar = ({
  onReplaceBackground,
  onSaveProject,
  onExportProject,
  onUndo,
  onRedo,
}) => {
  return (
    <div className="toolbar">
      <button onClick={onReplaceBackground}>Заменить фон</button>
      <button onClick={onSaveProject}>Сохранить как</button>
      <button onClick={onExportProject}>Экспорт</button>
      <button onClick={onUndo}>Отменить</button>
      <button onClick={onRedo}>Повторить</button>
    </div>
  );
};

export default Toolbar;
