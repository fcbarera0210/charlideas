import React, { useState, useEffect } from 'react';
import FloatingMenu from './components/FloatingMenu';
import TemplateViewer from './components/TemplateViewer';
import './index.css';

const App: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<number>(1);

  // Guardar selección en localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selectedTemplate');
    if (saved) {
      setActiveTemplate(parseInt(saved, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', activeTemplate.toString());
  }, [activeTemplate]);

  return (
    <div className="relative">
      <FloatingMenu 
        activeTemplate={activeTemplate} 
        onTemplateChange={setActiveTemplate} 
      />
      <TemplateViewer activeTemplate={activeTemplate} />
    </div>
  );
};

export default App;
