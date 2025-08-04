'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

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

export default function CameraController() {
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
