import React, { useRef, useState } from 'react';
import { Image, Text,Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Project } from '../types';
import { RADIUS } from '../constants';

interface ProjectCardProps {
  project: Project;
  index: number;
  count: number;
  activeIndex: number;
  isZoomed: boolean;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  count,
  activeIndex,
  isZoomed,
  onClick
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const imageRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  // Calculate position in the circle
  const angle = (index / count) * Math.PI * 2;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const isActive = index === activeIndex;
    
    // Smooth Scale
    const targetScale = hovered ? 1.15 : isActive ? 1.1 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);

    // Smooth Brightness logic for Light Mode
    if (imageRef.current && imageRef.current.material) {
        // In light mode, inactive cards can be slightly desaturated or faded
        const targetOpacity = isActive ? 1 : 0.6; 
        const hoverOpacity = hovered ? 0.4 : 0; // Add opacity when hovered
        
        imageRef.current.material.color.lerp(
            new THREE.Color(1, 1, 1), 
            delta * 5
        );
        
        // Handle opacity for focus
        const isFocusingOther = isZoomed && !isActive;
        const finalOpacity = isFocusingOther ? 0.05 : (targetOpacity + hoverOpacity);
        
        imageRef.current.material.opacity = THREE.MathUtils.lerp(
            imageRef.current.material.opacity, 
            finalOpacity > 1 ? 1 : finalOpacity, 
            delta * 5
        );
        imageRef.current.material.transparent = true;
        // In light mode, adding a bit of roughness makes them look like physical photos
        imageRef.current.material.roughness = 0.2; 
    }
  });

  return (
    <group
      ref={groupRef}
      position={[Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS]}
      rotation={[0, angle + Math.PI*2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* <Image
        ref={imageRef}
        url={project.imageUrl}
        transparent
        side={THREE.DoubleSide}
        toneMapped={true}
        scale={[2, 3, 1]}
      /> */}
      <Html prepend position={[0, 0, 0]} transform distanceFactor={2}>
  <img
    src={project.imageUrl}
    alt={project.title}
    style={{
      width: '100%',
      maxHeight: '550px', // 最大宽度
      height: 'auto',
      display: 'block',
      borderRadius: '8px', // 可选圆角美化
    }}
  />
</Html>
      {/* 3D Text Title - Dark Grey for Light Mode */}
      <Text
        position={[0, -1.9, 0.1]}
        fontSize={0.18}
        color="#1d1d1f" // Dark Grey
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
        textAlign="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff"
        opacity={index === activeIndex ? 1 : 0.4}
      >
        {project.title}
      </Text>
    </group>
  );
};