import { useEffect, useMemo, useRef, forwardRef } from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { LitTerrainMaterial } from './LitTerrainMaterial';
import { useTexture } from '@react-three/drei';

extend({ LitTerrainMaterial });

export interface ITerrainChunkProps {
  worldOrigin?: THREE.Vector2;
  position?: THREE.Vector3;
  size?: number;
  segments?: number;
  maxHeight?: number;
  frequency?: number;
  amplitude?: number;
  octaves?: number;
  lacunarity?: number;
  persistence?: number;
  exponentiation?: number;
  midMapPath?: string;
  highMapPath?: string;
  lowMapPath?: string;
  setShaderCompiled?: (compiled: boolean) => void;
}

const Terrain = forwardRef<THREE.Mesh, ITerrainChunkProps>(function Terrain(
  {
    worldOrigin = new THREE.Vector2(0, 0),
    position = new THREE.Vector3(0, -150, 0),
    size = 128,
    segments = 64,
    maxHeight = 400,
    frequency = .005,
    amplitude = 2,
    octaves = 8,
    lacunarity = 2,
    persistence = .5,
    exponentiation = 3,
    midMapPath = '/planet_texture01.png',
    highMapPath = '/planet_texture02.png',
    lowMapPath = '/planet_texture03.png',
    setShaderCompiled,
  },
  ref
) {
  const materialRef = useRef<LitTerrainMaterial>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const [midTexture, lowTexture, highTexture] = useTexture([
    lowMapPath, 
    midMapPath, 
    highMapPath
  ]);

  [midTexture, lowTexture, highTexture].forEach((tex) => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(size, size, segments, segments);
    geom.rotateX(-Math.PI / 2);
    geom.computeVertexNormals();
    geometryRef.current = geom;
    return geom;
  }, [size, segments]);

  useEffect(() => {
    return () => {
      if (geometryRef.current) {
        geometryRef.current.dispose();
        geometryRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!materialRef.current || !midTexture) return;
    materialRef.current.customUniforms.map.value = midTexture;
    materialRef.current.customUniforms.lowMap.value = lowTexture;
    materialRef.current.customUniforms.highMap.value = highTexture;
    materialRef.current.needsUpdate = true;
  }, [highTexture, lowTexture, midTexture]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.onShaderCompiled = () => {
      };
    }
    const material = materialRef.current;
    return () => {
      if (material) {
        material.onShaderCompiled = undefined;
      }
    };
  }, []);

  useEffect(() => {
    if (!materialRef.current) return;

    const uniforms = materialRef.current.customUniforms;

    uniforms.uMaxHeight.value = maxHeight;
    uniforms.uFrequency.value = frequency;
    uniforms.uAmplitude.value = amplitude;
    uniforms.uOctaves.value = octaves;
    uniforms.uLacunarity.value = lacunarity;
    uniforms.uPersistence.value = persistence;
    uniforms.uExponentiation.value = exponentiation;

    uniforms.uWorldOffset.value.set(
      position.x - worldOrigin.x,
      position.z - worldOrigin.y
    );
    uniforms.uWorldOrigin.value.set(worldOrigin.x, worldOrigin.y);
  }, [
    maxHeight,
    frequency,
    amplitude,
    octaves,
    lacunarity,
    persistence,
    exponentiation,
    position,
    worldOrigin,
  ]);

  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
      geometry={geometry}
    >
      <litTerrainMaterial
        ref={materialRef}
        attach="material"
        side={THREE.DoubleSide}
        onShaderCompiled={() => setShaderCompiled && setShaderCompiled(true)}
      />
    </mesh>
  );
});

export default Terrain;
