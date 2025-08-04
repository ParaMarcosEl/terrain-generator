import { useProgress } from '@react-three/drei';
import './CanvasLoader.css'

export const CanvasLoader = ({ materialLoaded }: { materialLoaded: boolean }) => {
  const { active, progress: dreiProgress } = useProgress(); 
  
  const isLoaderActive = 
    active  
    || !materialLoaded;

  return (<div className='loading-overlay'
          // style={{
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          //   width: '100%',
          //   height: '100%',
          //   background: '#111',
          //   color: '#fff',
          //   display: isLoaderActive ? 'flex' : 'none',
          //   flexDirection: 'column',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          //   fontSize: '1.5rem',
          //   zIndex: 1000,
          //   borderRadius: '8px',
          //   fontFamily: 'Inter, sans-serif',
          //   gap: '10px'
          // }}
        >
          {isLoaderActive && (
            <>
              <p>Loading Scene Assets: {Math.floor(dreiProgress)}%</p>
              {!materialLoaded &&  (
                <>
                <svg
                  className="svg-spinner"
                  viewBox="0 0 50 50"
                >
                  <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                  />
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