import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 0,
    title: "Virutal Office",
    category: "WebGL Experience",
    description: "Explore an interactive 3D office built with Three.js. Turn on the desk lamp, play the record player, and switch perspectives to navigate around desks, chairs, monitors, keyboards, and greenery.",
    imageUrl: "./components/digital office.gif",
    link: "#"
  },
  {
    id: 1,
    title: "Drive Game",
    category: "WebGL Experience",
    description: "Navigate a simple 3D environment with keyboard controls, interact with objects, and explore a minimalistic game world built for fun and learning.",
    imageUrl: "./components/car drive.gif",
    link: "#"
  },
  {
    id: 2,
    title: "Virtual Gallery",
    category: "WebGL Experience",
    description: "Explore a virtual gallery with multiple camera perspectives. Discover detailed oil paintings and switch viewpoints interactively to experience the art from different angles.",
    imageUrl: "./components/gallery.gif",
    link: "#"
  },
  {
    id: 3,
    title: "Ball Collision Simluation",
    category: "WebGL Physics Simulation",
    description: "Play with interactive spheres in a physics-based environment. Watch realistic collisions and dynamics as you experiment with movement and impact.",
    imageUrl: "./components/ball collide.gif",
    link: "#"
  },
  {
    id: 4,
    title: "Train Controller",
    category: "WebGL Experience",
    description: "Control the speed of a train as it moves along a circular track. Experience smooth, interactive motion in a dynamic 3D environment.",
    imageUrl: "./components/train.gif",
    link: "#"
  },
  {
    id: 5,
    title: "Dance Animation",
    category: "WebGL Experience",
    description: "Watch a 3D character come to life with smooth dance animations in an interactive 3D scene.",
    imageUrl: "./components/dance.gif",
    link: "#"
  }
];

export const RADIUS = 3.5; // Radius of the carousel
