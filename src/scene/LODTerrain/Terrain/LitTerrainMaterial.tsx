import * as THREE from 'three';

export class LitTerrainMaterial extends THREE.MeshStandardMaterial {
    
    customUniforms: {
        lowMap: { value: THREE.Texture | null }; 
        highMap: { value: THREE.Texture | null }; 
        map: { value: THREE.Texture | null }; 
        textureBlend: { value: number }; 
        uTime: { value: number }; 
        uMaxHeight: { value: number }; 
        uFrequency: { value: number }; 
        uAmplitude: { value: number }; 
        uOctaves: { value: number }; 
        uLacunarity: { value: number }; 
        uPersistence: { value: number }; 
        uExponentiation: { value: number }; 
        uWorldOffset: { value: THREE.Vector2 }; 
        uWorldOrigin: { value: THREE.Vector2 }; 
        uTextureScale: { value: number }; 
    };

    onShaderCompiled: (() => void) | undefined;

    constructor() {
        super({
            color: 0xffffff, 
            flatShading: false,
        });

        this.metalness = 0.2;
        this.roughness = 0.8;

        this.customUniforms = {
            lowMap: { value: null },
            highMap: { value: null },
            map: { value: null },
            textureBlend: { value: 0.5 },
            uTime: { value: 0 },
            uMaxHeight: { value: 40 },
            uFrequency: { value: 0.015 },
            uAmplitude: { value: 1.0 },
            uOctaves: { value: 6.0 },
            uLacunarity: { value: 2.0 },
            uPersistence: { value: 0.5 },
            uExponentiation: { value: 1.0 },
            uWorldOffset: { value: new THREE.Vector2(0, 0) },
            uWorldOrigin: { value: new THREE.Vector2(0, 0) },
            uTextureScale: { value: 0.08 },
        };

        this.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, this.customUniforms);


            shader.vertexShader = shader.vertexShader
                .replace(
                    '#include <common>',
                    `
                    #include <common>
                    varying vec2 vUv;
                    varying float vElevation; 
                    varying vec3 vWorldPosition; 
                    varying vec3 vWorldNormal; 

                    uniform float uMaxHeight;
                    uniform float uFrequency;
                    uniform float uAmplitude;
                    uniform float uOctaves;
                    uniform float uLacunarity;
                    uniform float uPersistence;
                    uniform float uExponentiation;
                    uniform vec2 uWorldOffset;
                    uniform vec2 uWorldOrigin;
        
                    vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
                    vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
                    
                    float noise(vec2 v) {
                        const vec4 C = vec4(0.211324865,0.366025404,0.577350269,0.0243902439);
                        vec2 i = floor(v + dot(v, C.yy));
                        vec2 x0 = v - i + dot(i, C.xx);
                        vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
                        vec4 x12 = x0.xyxy + C.xxzz;
                        x12.xy -= i1;
                        i = mod(i, 289.0);
                        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
                        vec3 x = fract(p * C.w) * 2.0 - 1.0;
                        vec3 h = abs(x) - 0.5;
                        vec3 ox = floor(x + 0.5);
                        vec3 a0 = x - ox;
                        vec2 g0 = vec2(a0.x, h.x);
                        vec2 g1 = vec2(a0.y, h.y);
                        vec2 g2 = vec2(a0.z, h.z);
                        vec3 w = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                        vec3 w4 = w*w*w*w;
                        float n = dot(w4, vec3(dot(g0,x0), dot(g1,x12.xy), dot(g2,x12.zw)));
                        return 70.0 * n;
                    }
        
                    float fbm(vec2 pos) {
                        float total = 0.0;
                        float frequency = uFrequency;
                        float amplitude = uAmplitude;
                        float maxAmplitude = 0.0;
        
                        for (int i = 0; i < 10; i++) {
                            // Stop if we've reached the specified number of octaves.
                            if (i >= int(uOctaves)) break;
                            total += noise(pos * frequency) * amplitude;
                            maxAmplitude += amplitude;
                            amplitude *= uPersistence;
                            frequency *= uLacunarity;
                        }
        
                        float normalized = total / maxAmplitude;
                        return pow((normalized + 1.0) / 2.0, uExponentiation);
                    }
        
                    float getElevation(vec2 worldPos) {
                        return fbm(worldPos) * uMaxHeight;
                    }
                    `
                )
                .replace('#include <uv_vertex>', 'vUv = uv;')
                .replace(
                    '#include <begin_vertex>',
                    `
                    vec3 transformed = position;
        
                    vec2 globalNoiseInput = position.xz + uWorldOffset + uWorldOrigin;
                    float elevation = getElevation(globalNoiseInput);
                    transformed.y = elevation;
                    vElevation = elevation / uMaxHeight;
        
                    float epsilon = 0.01;
                    vec2 dx = globalNoiseInput + vec2(epsilon, 0.0);
                    vec2 dz = globalNoiseInput + vec2(0.0, epsilon);
                    float elevation_dx = getElevation(dx);
                    float elevation_dz = getElevation(dz);
                    vec3 va = vec3(epsilon, elevation_dx - elevation, 0.0);
                    vec3 vb = vec3(0.0, elevation_dz - elevation, epsilon);
                    vec3 computedNormal = normalize(cross(vb, va));
                    
                    vNormal = normalize(normalMatrix * computedNormal);
                    vWorldNormal = normalize(mat3(modelMatrix) * computedNormal);
        
                    vWorldPosition = transformed + vec3(uWorldOffset.x + uWorldOrigin.x, 0.0, uWorldOffset.y + uWorldOrigin.y);
                    vWorldNormal = normalize(mat3(modelMatrix) * objectNormal);
                    `
                );


            shader.fragmentShader = shader.fragmentShader
                .replace(
                    '#include <common>',
                    `#include <common>
                    varying vec2 vUv;
                    varying float vElevation;
                    varying vec3 vWorldPosition;
                    varying vec3 vWorldNormal;
        
                    uniform sampler2D lowMap;
                    uniform sampler2D map;
                    uniform sampler2D highMap;
                    uniform float uTextureScale;
        
                    vec4 sampleTriplanar(sampler2D tex, vec3 worldPos, vec3 worldNormal, float scale) {
                        vec3 blendWeights = abs(worldNormal);
                        blendWeights = normalize(blendWeights + vec3(0.00001));
        
                        vec4 xProj = texture2D(tex, worldPos.yz * scale);
                        vec4 yProj = texture2D(tex, worldPos.xz * scale);
                        vec4 zProj = texture2D(tex, worldPos.xy * scale);
        
                        return xProj * blendWeights.x + yProj * blendWeights.y + zProj * blendWeights.z;
                    }
                    `
                )
                .replace(
                    '#include <map_fragment>',
                    `
                    vec4 lowColor = sampleTriplanar(lowMap, vWorldPosition, vWorldNormal, uTextureScale);
                    vec4 midColor = sampleTriplanar(map, vWorldPosition, vWorldNormal, uTextureScale);
                    vec4 highColor = sampleTriplanar(highMap, vWorldPosition, vWorldNormal, uTextureScale);
        
                    float blendStartLowToMid = 0.1;
                    float blendEndLowToMid = 0.12;
                    float blendStartMidToHigh = 0.18;
                    float blendEndMidToHigh = 0.23;
        
                    float lowToMidBlend = smoothstep(blendStartLowToMid, blendEndLowToMid, vElevation);
                    float midToHighBlend = smoothstep(blendStartMidToHigh, blendEndMidToHigh, vElevation);
        
                    vec4 finalColor = mix(lowColor, midColor, lowToMidBlend);
                    finalColor = mix(finalColor, highColor, midToHighBlend);
        
                    diffuseColor.rgb = finalColor.rgb;
                    `
                );

            this.userData.shader = shader;

            if (this.onShaderCompiled) {
                this.onShaderCompiled();
            }
        };
    }

    updateTime(time: number) {
        this.customUniforms.uTime.value = time;
    }
}