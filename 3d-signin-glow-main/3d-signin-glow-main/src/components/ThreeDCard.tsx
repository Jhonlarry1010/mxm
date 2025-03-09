
import { ReactNode, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { cn } from '@/lib/utils';

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function ThreeDCard({ 
  children, 
  className, 
  intensity = 10
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const mousePosition = useMousePosition();
  
  const handleMouseMove = () => {
    if (!cardRef.current || !isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate center of the card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center of card
    const mouseX = mousePosition.x - centerX;
    const mouseY = mousePosition.y - centerY;
    
    // Calculate rotation values (inverted and scaled down)
    const rotateY = (mouseX / (rect.width / 2)) * intensity;
    const rotateX = -((mouseY / (rect.height / 2)) * intensity);
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  return (
    <div 
      className="perspective"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <div 
        ref={cardRef}
        className={cn(
          "preserve-3d w-full rounded-xl backdrop-blur-card",
          "bg-white/70 dark:bg-black/40 shadow-xl",
          "transition-transform duration-200 ease-out",
          className
        )}
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.25),
               0 0 0 1px rgba(255, 255, 255, 0.1) inset,
               ${-rotation.y/3}px ${rotation.x/3}px 30px rgba(0, 0, 0, 0.1)`
            : '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
        }}
      >
        {children}
      </div>
    </div>
  );
}
