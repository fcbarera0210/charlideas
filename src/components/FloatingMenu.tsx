import React, { useState, useRef, useEffect, useCallback } from 'react';
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
    const updatePosition = (clientX: number, clientY: number) => {
      if (dragStart) {
        // Detectar si el usuario está arrastrando (movimiento > 5px)
        if (!hasMoved && !isDragging) {
          const deltaX = Math.abs(clientX - dragStart.x);
          const deltaY = Math.abs(clientY - dragStart.y);
          if (deltaX > 5 || deltaY > 5) {
            setHasMoved(true);
            setIsDragging(true);
          }
        }

        // Si está arrastrando, mover el menú
        if (isDragging || hasMoved) {
          const newX = clientX - dragOffset.x;
          const newY = clientY - dragOffset.y;
          
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

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
        e.preventDefault(); // Prevenir scroll mientras se arrastra
      }
    };

    const endDrag = () => {
      if (dragStart && !hasMoved && !isDragging) {
        // Fue un clic/toque, no un arrastre
        setIsExpanded(!isExpanded);
      }
      setIsDragging(false);
      setDragStart(null);
      setHasMoved(false);
    };

    const handleMouseUp = () => {
      endDrag();
    };

    const handleTouchEnd = () => {
      endDrag();
    };

    if (dragStart) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      if (isDragging) {
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        document.body.style.touchAction = 'none';
      }
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.touchAction = '';
    };
  }, [dragStart, isDragging, hasMoved, dragOffset, isExpanded]);

  const startDrag = useCallback((clientX: number, clientY: number) => {
    if (menuRef.current) {
      setDragStart({ x: clientX, y: clientY });
      setHasMoved(false);
      const rect = menuRef.current.getBoundingClientRect();
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
    }
  }, []);

  // Manejar touchstart con listener manual para poder usar { passive: false }
  useEffect(() => {
    const button = menuRef.current?.querySelector('button');
    if (!button) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        startDrag(touch.clientX, touch.clientY);
        e.preventDefault(); // Ahora podemos usar preventDefault porque el listener no es pasivo
      }
    };

    button.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      button.removeEventListener('touchstart', handleTouchStart);
    };
  }, [startDrag]);

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
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
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
            touch-none
          `}
          title="Arrastrar para mover o hacer clic para expandir"
          style={{ touchAction: 'none' }}
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
