import { extend, type ThreeElement } from '@react-three/fiber';
import { LitTerrainMaterial } from './LODTerrain/Terrain/LitTerrainMaterial';
import * as THREE from 'three';

extend({ LitTerrainMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    litTerrainMaterial: ThreeElement<typeof THREE.MeshStandardMaterial> & {
      onShaderCompiled?: () => void;
      worldOrigin?: THREE.Vector2;
      position?: THREE.Vector3;
      size?: number; // Size of the terrain plane
      segments?: number; // Resolution of the terrain plane
      maxHeight?: number; // Terrain height scale
      frequency?: number; // Noise frequency
      amplitude?: number; // Noise amplitude
      octaves?: number; // Number of noise octaves
      lacunarity?: number; // Lacunarity for FBM
      persistence?: number; // Persistence for FBM
      exponentiation?: number; // Exponentiation for FBM
      textureBlend?: number;
      lowMap?: THREE.Texture;
      highMap?: THREE.Texture;
      map?: THREE.Texture;
    };
  }
}
