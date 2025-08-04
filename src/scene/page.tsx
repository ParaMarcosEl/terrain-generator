/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, Suspense, useState, useMemo, createRef } from 'react';
import * as THREE from 'three';
import { Skybox } from './Skybox';
import TerrainChunkManager from './LODTerrain/TerrainChunkManager';
import { useProgress } from '@react-three/drei';

const CanvasLoader = ({ materialLoaded }: { materialLoaded: boolean }) => {
  const { active, progress: dreiProgress } = useProgress(); 


  // Determine if the loader should be active
  // It's active if general assets are loading, OR
  // if terrain chunks are still building, OR
  // if the TerrainMaterial hasn't been reported as loaded yet.
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
            zIndex: 1000,
            borderRadius: '8px',
            fontFamily: 'Inter, sans-serif',
            gap: '10px'
          }}
        >
          {isLoaderActive && (
            <>
              <p>Loading Scene Assets: {Math.floor(dreiProgress)}%</p>
              {!materialLoaded &&  (
                <p>Compiling Terrain Shaders...</p> 
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

    // Movement
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

    // Rotation
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

export default function Stage1() {
  const [materialLoaded, setMaterialLoaded] = useState(true);
  
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
        <CanvasLoader materialLoaded={materialLoaded}/>
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[100, 10, 5]} intensity={0.7} castShadow />

            {/* World */}
            <Skybox />
            <TerrainChunkManager 
                lowMapPath='/planet_texture01.png' 
                midMapPath='/planet_texture02.png'
                highMapPath='/planet_texture01.png'
                chunkSize={128} 
                segments={64}
                frequency={0.001}
                amplitude={1}
                exponentiation={3}
                maxHeight={800}
                octaves={8}
                yOffset={-200}
            />
            <CameraController />
            {/* Camera is now correctly linked to the aircraft's mesh ref */}
        </Suspense>
      </Canvas>
    </main>
  );
}
