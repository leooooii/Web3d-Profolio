import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { UIOverlay } from './components/UIOverlay';
import { RobotTriggerState } from './types';

// Loading Component
const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center text-gray-900 bg-[#F5F5F7] z-50">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-sm tracking-widest text-gray-500">LOADING EXPERIENCE</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [robotTrigger, setRobotTrigger] = useState<RobotTriggerState>({ type: 'idle', id: 0 });

  return (
    <div className="relative w-full h-full bg-[#F5F5F7]">
      
      {/* 2D Overlay Interface */}
      <UIOverlay 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex}
        isZoomed={isZoomed}
        setIsZoomed={setIsZoomed}
        setRobotTrigger={setRobotTrigger}
      />

      {/* 3D Canvas */}
      <Suspense fallback={<Loader />}>
        <Canvas
            shadows
            dpr={[1, 2]} // Handle pixel ratio for sharp text
            camera={{ position: [0, 0.5, 9.5], fov: 45 }}
            gl={{ antialias: true, alpha: false }}
        >
            <color attach="background" args={['#F5F5F7']} />
            <Scene 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} 
                isZoomed={isZoomed}
                setIsZoomed={setIsZoomed}
                robotTrigger={robotTrigger}
            />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;