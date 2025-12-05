import React from 'react';
import { PROJECTS } from '../constants';
import { RobotTriggerState } from '../types';

interface UIOverlayProps {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  isZoomed: boolean;
  setIsZoomed: (z: boolean) => void;
  setRobotTrigger: (trigger: RobotTriggerState) => void;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({
  activeIndex,
  setActiveIndex,
  isZoomed,
  setIsZoomed,
  setRobotTrigger
}) => {
  const currentProject = PROJECTS[activeIndex];

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % PROJECTS.length);
    setIsZoomed(false);
    // Trigger Right Hand Wave (indicating direction or excitement)
    setRobotTrigger({ type: 'right', id: Date.now() });
  };

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + PROJECTS.length) % PROJECTS.length);
    setIsZoomed(false);
    // Trigger Left Hand Wave
    setRobotTrigger({ type: 'left', id: Date.now() });
  };

  const buttonClass = "w-14 h-14 flex items-center justify-center rounded-full bg-white/80 border border-gray-200 shadow-lg text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md";

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10 p-6 md:p-12">
      {/* Header */}
      <header className="flex justify-between items-start pointer-events-auto">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tighter">
            LEO
            <span className="text-blue-500">.</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Interactive 3D Portfolio</p>
        </div>
        
        <div className="flex gap-6">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Contact</a>
        </div>
      </header>

      {/* Main Content Area (Bottom) */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 pointer-events-auto">
        
        {/* Project Info Panel - Light Mode Glass */}
        <div className={`
            flex-1 max-w-lg transition-all duration-500 ease-out transform
            ${isZoomed ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-2'}
        `}>
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 text-[10px] font-bold tracking-wide bg-gray-900 text-white rounded-full uppercase">
                    {currentProject.category}
                </span>
                <span className="text-gray-400 text-xs font-medium">
                    {activeIndex + 1} / {PROJECTS.length}
                </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
              {currentProject.title}
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed text-sm font-medium">
              {currentProject.description}
            </p>

            <div className="flex gap-3">
                {/* <button 
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
                >
                    {isZoomed ? 'Back to Gallery' : 'View Details'}
                </button> */}
                <a 
                    href={currentProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`
                        px-6 py-3 border border-gray-200 bg-white/50 text-gray-900 text-sm font-semibold rounded-full hover:bg-white hover:border-gray-300 transition-all flex items-center gap-2
                       
                    `}
                >
                    Visit Project
                </a>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex gap-4 items-center mb-2">
            <button 
                onClick={handlePrev}
                className={buttonClass}
                aria-label="Previous Project"
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button 
                onClick={handleNext}
                className={buttonClass}
                aria-label="Next Project"
            >
               <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};