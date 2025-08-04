'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Skybox } from './scene/Skybox';
import TerrainChunkManager from './scene/LODTerrain/TerrainChunkManager';
import { useProgress } from '@react-three/drei';
import './App.css'

const CanvasLoader = ({ materialLoaded }: { materialLoaded: boolean }) => {
  const { active, progress: dreiProgress } = useProgress(); 
  
  const isLoaderActive = 
    active  
    || !materialLoaded;

  return (<div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#111',
            color: '#fff',
            display: isLoaderActive ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            zIndex: 500,
            borderRadius: '8px',
            fontFamily: 'Inter, sans-serif',
            gap: '10px'
          }}
        >
          {isLoaderActive && (
            <>
              <p>Loading Scene Assets: {Math.floor(dreiProgress)}%</p>
              {!materialLoaded &&  (
                <>
                  <svg 
                    height={50}
                    width={200}
                    fill="hsl(228, 97%, 42%)"  
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                      <circle 
                        cx="4" 
                        cy="12" 
                        r="0"
                      >
                        <animate 
                          begin="0;spinner_z0Or.end" 
                          attributeName="r" 
                          calcMode="spline" 
                          dur="0.5s" 
                          keySplines=".36,.6,.31,1" 
                          values="0;3" 
                          fill="freeze"
                        />
                        <animate 
                          begin="spinner_OLMs.end" 
                          attributeName="cx" 
                          calcMode="spline" 
                          dur="0.5s" 
                          keySplines=".36,.6,.31,1" 
                          values="4;12" 
                          fill="freeze"
                        />
                        <animate 
                          begin="spinner_UHR2.end" 
                          attributeName="cx" 
                          calcMode="spline" 
                          dur="0.5s" 
                          keySplines=".36,.6,.31,1" 
                          values="12;20"
                          fill="freeze"
                        />
                        <animate 
                          id="spinner_lo66" 
                          begin="spinner_Aguh.end" 
                          attributeName="r" 
                          calcMode="spline" 
                          dur="0.5s" 
                          keySplines=".36,.6,.31,1" 
                          values="3;0" 
                          fill="freeze"
                        />
                        <animate 
                          id="spinner_z0Or" 
                          begin="spinner_lo66.end" 
                          attributeName="cx" 
                          dur="0.001s" 
                          values="20;4" 
                          fill="freeze"
                        />
                      </circle>
                      <circle cx="4" cy="12" r="3">
                        <animate 
                          begin="0;spinner_z0Or.end" 
                          attributeName="cx" 
                          calcMode="spline" 
                          dur="0.5s"
                          keySplines=".36,.6,.31,1"
                          values="4;12"
                          fill="freeze"
                        />
                        
                          <animate 
                          begin="spinner_OLMs.end" 
                          attributeName="cx" 
                          calcMode="spline" 
                          dur="0.5s" 
                          keySplines=".36,.6,.31,1" 
                          values="12;20" 
                          fill="freeze"
                          />
                          <animate 
                            id="spinner_JsnR" 
                            begin="spinner_UHR2.end" 
                            attributeName="r" 
                            calcMode="spline" 
                            dur="0.5s" 
                            keySplines=".36,.6,.31,1" 
                            values="3;0" 
                            fill="freeze"
                          />
                          <animate
                            id="spinner_Aguh"
                            begin="spinner_JsnR.end"
                            attributeName="cx"
                            dur="0.001s"
                            values="20;4"
                            fill="freeze"
                          />
                          <animate
                            begin="spinner_Aguh.end"
                            attributeName="r"
                            calcMode="spline"
                            dur="0.5s"
                            keySplines=".36,.6,.31,1"
                            values="0;3"
                            fill="freeze"
                          />
                        </circle>
                        <circle cx="12" cy="12" r="3">
                          <animate
                            begin="0;spinner_z0Or.end"
                            attributeName="cx"
                            calcMode="spline"
                            dur="0.5s"
                            keySplines=".36,.6,.31,1"
                            values="12;20"
                            fill="freeze"
                          />
                          <animate 
                            id="spinner_hSjk" 
                            begin="spinner_OLMs.end" 
                            attributeName="r" 
                            calcMode="spline" 
                            dur="0.5s" 
                            keySplines=".36,.6,.31,1" 
                            values="3;0" 
                            fill="freeze"
                          />
                          <animate 
                            id="spinner_UHR2"
                            begin="spinner_hSjk.end"
                            attributeName="cx"
                            dur="0.001s"
                            values="20;4"
                            fill="freeze"
                          />

                         <animate 
                            begin="spinner_UHR2.end"
                            attributeName="r"
                            calcMode="spline"
                            dur="0.5s"
                            keySplines=".36,.6,.31,1"
                            values="0;3"
                            fill="freeze"
                          />

                         <animate 
                            begin="spinner_Aguh.end"
                            attributeName="cx"
                            calcMode="spline"
                            dur="0.5s"
                            keySplines=".36,.6,.31,1"
                            values="4;12"
                            fill="freeze"
                          />
                        </circle>
                        <circle cx="20" cy="12" r="3">
                          <animate 
                            id="spinner_4v5M"
                            begin="0;spinner_z0Or.end"
                            attributeName="r"
                            calcMode="spline"
                            dur="0.5s"
                            keySplines=".36,.6,.31,1"
                            values="3;0"
                            fill="freeze"
                          />

                         <animate 
                            id="spinner_OLMs"
                            begin="spinner_4v5M.end"
                            attributeName="cx"
                            dur="0.001s"
                            values="20;4"
                            fill="freeze"
                          />

                         <animate 
                            begin="spinner_OLMs.end"
                            attributeName="r"
                            calcMode="spline"
                            dur="0.5s"
                            keySplines=".36,.6,.31,1"
                            values="0;3" fill="freeze"
                          />
                          <animate 
                            begin="spinner_UHR2.end"
                            attributeName="cx"
                            calcMode="spline"
                            dur="0.5s"
                            keySplines=".36,.6,.31,1"
                            values="4;12" 
                            fill="freeze"
                          />
                          
                          <animate 
                            begin="spinner_Aguh.end" 
                            attributeName="cx" 
                            calcMode="spline" 
                            dur="0.5s" 
                            keySplines=".36,.6,.31,1" 
                            values="12;20" 
                            fill="freeze"
                          />
                      </circle>
                    </svg>
                  <p>Compiling Terrain Shaders...</p> 
                </>
              )}
            </>
          )}
          {!isLoaderActive && (
            <p>Loading Complete!</p>
          )}
        </div>);
};

const moveSpeed = 2;
const rotateSpeed = 0.02;

const keys = {
  forward: 'w',
  backward: 's',
  left: 'a',
  right: 'd',
  rotLeft: 'j',
  rotRight: 'l',
  rotUp: 'i',
  rotDown: 'k',
};

const pressedKeys = new Set<string>();

function CameraController() {
  const { camera } = useThree();
  const direction = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => pressedKeys.add(e.key.toLowerCase());
    const handleKeyUp = (e: KeyboardEvent) => pressedKeys.delete(e.key.toLowerCase());

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const cam = camera;

    if (pressedKeys.has(keys.forward)) {
      cam.getWorldDirection(direction.current);
      cam.position.addScaledVector(direction.current, moveSpeed);
    }
    if (pressedKeys.has(keys.backward)) {
      cam.getWorldDirection(direction.current);
      cam.position.addScaledVector(direction.current, -moveSpeed);
    }
    if (pressedKeys.has(keys.left)) {
      cam.getWorldDirection(direction.current);
      const left = new THREE.Vector3().crossVectors(cam.up, direction.current).normalize();
      cam.position.addScaledVector(left, moveSpeed);
    }
    if (pressedKeys.has(keys.right)) {
      cam.getWorldDirection(direction.current);
      const right = new THREE.Vector3().crossVectors(direction.current, cam.up).normalize();
      cam.position.addScaledVector(right, moveSpeed);
    }

    if (pressedKeys.has(keys.rotLeft)) {
      cam.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), rotateSpeed);
    }
    if (pressedKeys.has(keys.rotRight)) {
      cam.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -rotateSpeed);
    }
    if (pressedKeys.has(keys.rotUp)) {
      cam.rotateX(rotateSpeed);
    }
    if (pressedKeys.has(keys.rotDown)) {
      cam.rotateX(-rotateSpeed);
    }
  });

  return null;
}

export default function App() {
  const [materialLoaded, setMaterialLoaded] = useState(false);
  
  return (
    <main className="w-full h-full">
    <div className="absolute top-20 left-20 bg-black bg-opacity-50 rounded-xl p-4 max-w-xs text-sm pointer-events-none z-[1000]">
      <h2 className="font-semibold text-white mb-2">Controls</h2>
      <div><kbd className="bg-white px-1 text-white rounded">W</kbd> / <kbd>S</kbd> – Move forward/backward</div>
      <div><kbd className="bg-white px-1 text-white rounded">A</kbd> / <kbd>D</kbd> – Strafe left/right</div>
      <div><kbd className="bg-white px-1 text-white rounded">I</kbd> / <kbd>K</kbd> – Pitch up/down</div>
      <div><kbd className="bg-white px-1 text-white rounded">J</kbd> / <kbd>L</kbd> – Turn left/right</div>
    </div>
      
      <CanvasLoader materialLoaded={materialLoaded} />
      <Canvas 
        camera={{ position: [0, 5, 15], fov: 60 }}
        gl={{ preserveDrawingBuffer: true }}
      >
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[100, 10, 5]} intensity={0.7} castShadow />

            {/* World */}
            <Skybox />
            <TerrainChunkManager 
                lowMapPath='/planet_texture01.png' 
                midMapPath='/planet_texture02.png'
                highMapPath='/planet_texture03.png'
                chunkSize={128} 
                segments={64}
                frequency={0.001}
                amplitude={1}
                exponentiation={3}
                maxHeight={800}
                octaves={8}
                yOffset={-200}
                onMaterialLoaded={() => setMaterialLoaded(true)}
            />
            
            <CameraController />
            {/* Camera is now correctly linked to the aircraft's mesh ref */}
      </Canvas>
    </main>
  );
}
