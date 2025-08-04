# Three.js Terrain & Skybox Application

A React Three Fiber (R3F) project bootstrapped with Vite that renders a procedurally generated terrain with a skybox background. Includes camera controls and loading indicators.

---

## Features

- Procedural terrain with multiple level-of-detail (LOD) chunks
- Custom skybox using cube textures
- Keyboard-controlled free-flight camera
- Loading progress display with suspense fallback
- Responsive full-screen canvas with Tailwind CSS styling

---

## Technologies Used

- [Vite](https://vitejs.dev/) – fast frontend build tool
- [React](https://reactjs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) – React renderer for Three.js
- [Three.js](https://threejs.org/) – 3D graphics library
- [Tailwind CSS](https://tailwindcss.com/) – utility-first CSS framework
- [@react-three/drei](https://github.com/pmndrs/drei) – helpers and abstractions for R3F

---

## Getting Started

### Prerequisites

- Node.js v16+ (recommended)
- npm or yarn package manager

### Installation

1. Clone this repository:

```bash
git clone https://github.com/paramarcosel/terrain-generator.git
cd terrain-generator
```
2. Install Dependencies:

```bash
npm install
# or
yarn install
```
3. Add your skybox textures to the /public directory:

Place the six cube face images (e.g. right.png, left.png, top.png, bottom.png, front.png, back.png) inside /public.

Make sure textures are:

- Power-of-two dimensions (e.g. 1024x1024)

- Same size and format (PNG/JPG)

### Development Server
Start the local development server:

```bash
npm run dev
# or
yarn dev
```
Open http://localhost:5173 to see the app.

### Usage
- Use WASD keys to move forward/backward and strafe left/right.

- Use I/K to pitch camera up/down.

- Use J/L to rotate camera left/right.

- Watch loading progress while terrain and shaders compile.


### License
MIT © Para El

### Acknowledgments
- Based on SimonDev's [3D world Generatioin](https://www.youtube.com/playlist?list=PLRL3Z3lpLmH3PNGZuDNf2WXnLTHpN9hXy) 
- Skybox images courtesy of [Space-3D](https://tools.wwwtyro.net/space-3d/index.html) 