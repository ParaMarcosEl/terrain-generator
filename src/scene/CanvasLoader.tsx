// CanvasLoader.tsx
import { useProgress } from '@react-three/drei';

// CanvasLoader component to show loading progress
export const CanvasLoader = ({ materialLoaded }: { materialLoaded: boolean }) => {
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