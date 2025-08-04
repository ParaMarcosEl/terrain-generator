import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';

export function Skybox() {
  const { scene } = useThree();

  const skyboxTexture = useMemo(() => {
    const loader = new THREE.CubeTextureLoader();

    return loader.load([
      `/right.png`, // +X
      `/left.png`, // -X
      `/top.png`, // +Y
      `/bottom.png`, // -Y
      `/front.png`, // +Z
      `/back.png`, // -Z
    ]);
  }, []);

  useEffect(() => {
  console.log('Skybox texture loaded:', skyboxTexture);
    scene.background = skyboxTexture;
  }, [scene, skyboxTexture]);

  return null;
}
