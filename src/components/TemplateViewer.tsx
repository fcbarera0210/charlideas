import React from 'react';
import Template1 from '../templates/template1';
import Template2 from '../templates/template2';
import Template3 from '../templates/template3';

interface TemplateViewerProps {
  activeTemplate: number;
}

const TemplateViewer: React.FC<TemplateViewerProps> = ({ activeTemplate }) => {
  const templates = {
    1: Template1,
    2: Template2,
    3: Template3,
  };

  const ActiveTemplate = templates[activeTemplate as keyof typeof templates] || Template1;

  return (
    <div className="transition-opacity duration-500">
      <ActiveTemplate />
    </div>
  );
};

export default TemplateViewer;
