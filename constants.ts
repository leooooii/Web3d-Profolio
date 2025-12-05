import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 0,
    title: "Virutal Office",
    category: "WebGL Experience",
    description: "Explore an interactive 3D office built with Three.js. Turn on the desk lamp, play the record player, and switch perspectives to navigate around desks, chairs, monitors, keyboards, and greenery.",
    imageUrl: "./public/assets/digital-office.gif",
    link: "https://leooooii.github.io/Virtual-Office/"
  },
  {
    id: 1,
    title: "Drive Game",
    category: "WebGL Experience",
    description: "Navigate a simple 3D environment with keyboard controls, interact with objects, and explore a minimalistic game world built for fun and learning.",
    imageUrl: "./public/assets/car-drive.gif",
    link: "https://leooooii.github.io/Web3d-Collection/hw1-car-sim/index.html"
  },
  {
    id: 2,
    title: "Virtual Gallery",
    category: "WebGL Experience",
    description: "Explore a virtual gallery with multiple camera perspectives. Discover detailed oil paintings and switch viewpoints interactively to experience the art from different angles.",
    imageUrl: "./public/assets/gallery.gif",
    link: "https://leooooii.github.io/Web3d-Collection/hw4-virtual-gallery/index.html"
  },
  {
    id: 3,
    title: "Ball Collision Simluation",
    category: "WebGL Physics Simulation",
    description: "Play with interactive spheres in a physics-based environment. Watch realistic collisions and dynamics as you experiment with movement and impact.",
    imageUrl: "./public/assets/ball-collide.gif",
    link: "https://leooooii.github.io/Web3d-Collection/hw2-ball-collide/index.html"
  },
  {
    id: 4,
    title: "Train Controller",
    category: "WebGL Experience",
    description: "Control the speed of a train as it moves along a circular track. Experience smooth, interactive motion in a dynamic 3D environment.",
    imageUrl: "./public/assets/train.gif",
    link: "https://leooooii.github.io/Web3d-Collection/hw0-train/index.html"
  },
  {
    id: 5,
    title: "Dance Animation",
    category: "WebGL Experience",
    description: "Watch a 3D character come to life with smooth dance animations in an interactive 3D scene.",
    imageUrl: "./public/assets/dance.gif",
    link: "https://leooooii.github.io/Web3d-Collection/hw3-dancing/index.html"
  }
];

export const RADIUS = 3.5; // Radius of the carousel
