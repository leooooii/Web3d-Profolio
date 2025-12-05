import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface StoreState {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isZoomed: boolean;
  setIsZoomed: (zoomed: boolean) => void;
}

export interface RobotTriggerState {
  type: 'idle' | 'left' | 'right';
  id: number; // Unique ID to force re-trigger even if type is same
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      color: any;
      cylinderGeometry: any;
      directionalLight: any;
      fog: any;
      group: any;
      mesh: any;
      meshBasicMaterial: any;
      meshStandardMaterial: any;
      planeGeometry: any;
      sphereGeometry: any;
      [elemName: string]: any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      color: any;
      cylinderGeometry: any;
      directionalLight: any;
      fog: any;
      group: any;
      mesh: any;
      meshBasicMaterial: any;
      meshStandardMaterial: any;
      planeGeometry: any;
      sphereGeometry: any;
      [elemName: string]: any;
    }
  }
}
