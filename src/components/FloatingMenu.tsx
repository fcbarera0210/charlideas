import React, { useState, useRef, useEffect } from 'react';
import { Layout, ChevronDown, GripVertical } from 'lucide-react';

interface FloatingMenuProps {
  activeTemplate: number;
  onTemplateChange: (template: number) => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ activeTemplate, onTemplateChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth - 80 : 0,
    y: 20
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const templates = [
    { id: 1, name: 'Template 1' },
    { id: 2, name: 'Template 2' },
    { id: 3, name: 'Template 3' },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragStart) {
        // Detectar si el usuario está arrastrando (movimiento > 5px)
        if (!hasMoved && !isDragging) {
          const deltaX = Math.abs(e.clientX - dragStart.x);
          const deltaY = Math.abs(e.clientY - dragStart.y);
          if (deltaX > 5 || deltaY > 5) {
            setHasMoved(true);
            setIsDragging(true);
          }
        }

        // Si está arrastrando, mover el menú
        if (isDragging || hasMoved) {
          const newX = e.clientX - dragOffset.x;
          const newY = e.clientY - dragOffset.y;
          
          // Constrain to viewport
          const maxX = window.innerWidth - (isExpanded ? 200 : 60);
          const maxY = window.innerHeight - (isExpanded ? 200 : 60);
          
          setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY)),
          });
        }
      }
    };

    const handleMouseUp = () => {
      if (dragStart && !hasMoved && !isDragging) {
        // Fue un clic, no un arrastre
        setIsExpanded(!isExpanded);
      }
      setIsDragging(false);
      setDragStart(null);
      setHasMoved(false);
    };

    if (dragStart) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      if (isDragging) {
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
      }
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [dragStart, isDragging, hasMoved, dragOffset, isExpanded]);

  useEffect(() => {
    // Ajustar posición cuando la ventana se redimensiona
    const handleResize = () => {
      const maxX = window.innerWidth - (isExpanded ? 200 : 60);
      const maxY = window.innerHeight - (isExpanded ? 200 : 60);
      setPosition(prev => ({
        x: Math.min(prev.x, maxX),
        y: Math.min(prev.y, maxY),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (menuRef.current) {
      setDragStart({ x: e.clientX, y: e.clientY });
      setHasMoved(false);
      const rect = menuRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      e.preventDefault();
    }
  };

  const handleTemplateClick = (templateId: number) => {
    onTemplateChange(templateId);
    setIsExpanded(false);
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
      }}
      className="select-none"
    >
      <div className="flex flex-col gap-2">
        {/* Botón principal - arrastrable y expandible */}
        <button
          onMouseDown={handleMouseDown}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            backdrop-blur-md shadow-lg
            transition-all duration-300
            ${isExpanded ? 'bg-[#00B4B9] text-white' : 'bg-white/90 text-slate-700 border border-slate-200'}
            hover:scale-110 active:scale-95
            ${isDragging ? 'opacity-80 cursor-grabbing' : 'cursor-grab'}
          `}
          title="Arrastrar para mover o hacer clic para expandir"
        >
          {isExpanded ? (
            <ChevronDown 
              size={20} 
              className="transition-transform duration-300 rotate-180"
            />
          ) : (
            <GripVertical size={20} />
          )}
        </button>

        {/* Opciones expandibles */}
        {isExpanded && (
          <div className="flex flex-col gap-2 transition-opacity duration-200">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template.id)}
                className={`
                  px-3 py-2 rounded-lg font-medium text-xs whitespace-nowrap
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  backdrop-blur-md shadow-lg
                  ${
                    activeTemplate === template.id
                      ? 'bg-[#00B4B9] text-white shadow-[#00B4B9]/50'
                      : 'bg-white/90 text-slate-700 hover:bg-white border border-slate-200'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Layout size={14} />
                  <span>{template.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingMenu;
