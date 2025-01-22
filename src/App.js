import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import TemplatesPage from "./pages/TemplatesPage";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/editor/:templateId" element={<EditorPage />} />
        <Route path="/dashboard" element={<div>Личный кабинет (в разработке)</div>} />
      </Routes>
    </Router>
  );
}

export default App;