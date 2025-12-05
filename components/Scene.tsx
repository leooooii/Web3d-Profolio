import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Sparkles, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS } from '../constants';
import { ProjectCard } from './ProjectCard';
import { InteractiveWidget } from './InteractiveWidget';
import { RobotTriggerState } from '../types';

interface SceneProps {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  isZoomed: boolean;
  setIsZoomed: (z: boolean) => void;
  robotTrigger: RobotTriggerState;
}

export const Scene: React.FC<SceneProps> = ({ activeIndex, setActiveIndex, isZoomed, setIsZoomed, robotTrigger }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  const count = PROJECTS.length;
  const anglePerCard = (Math.PI * 2) / count;
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetY = -(activeIndex * anglePerCard);
    
    // Smooth rotation of the carousel group
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      delta * 4 
    );

    // Camera Animation
    const targetCameraPos = new THREE.Vector3();
    
    if (isZoomed) {
      targetCameraPos.set(0, 0, 6); 
    } else {
      targetCameraPos.set(0, 0.5, 9.5);
    }

    state.camera.position.lerp(targetCameraPos, delta * 2);
    state.camera.lookAt(0, 0, 0); 
  });

  const handleCardClick = (index: number) => {
    if (activeIndex === index) {
      setIsZoomed(!isZoomed);
    } else {
      setActiveIndex(index);
      setIsZoomed(false);
    }
  };

  return (
    <>
      {/* Light Mode Environment */}
      <Environment preset="studio" />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      {/* Soft Fog for depth matching light background */}
      <fog attach="fog" args={['#F5F5F7', 8, 25]} />
      
      {/* Subtle Floating Particles - Grey/Silver */}
      <Sparkles count={50} scale={10} size={3} speed={0.4} opacity={0.2} color="#8e8e93" />

      {/* Main Carousel Group */}
      <group position={[0, -0.5, -1]}>
        <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
            <group ref={groupRef}>
            {PROJECTS.map((project, index) => (
                <ProjectCard
                key={project.id}
                project={project}
                index={index}
                count={count}
                activeIndex={activeIndex}
                isZoomed={isZoomed}
                onClick={() => handleCardClick(index)}
                />
            ))}
            </group>
        </Float>
      </group>

      {/* Interactive 3D Companion Widget */}
      {/* Moved to the right side, larger scale, slightly behind the foreground plane */}
      <InteractiveWidget 
        position={[4, -1, 2]} 
        rotation={[0, -0.3, 0]} 
        scale={2.2} 
        trigger={robotTrigger}
      />

      {/* Floor Shadows */}
      <ContactShadows 
        position={[0, -2.5, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2} 
        far={4.5} 
        color="#000000"
      />
    </>
  );
};