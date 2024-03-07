import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useFrame, useEffect, useRef, useState } from "react";
import { AnimationMixer } from "three";
import axios from 'axios';
// import { bodyString } from './server.js';
import '../index.css'
import {Helmet} from "react-helmet";

const Model = () => {
    // const gltf = useLoader(GLTFLoader, "RobotExpressive.glb");
    const { nodes, materials, animations } = useGLTF("RobotExpressive.glb");
    const modelRef = useRef();
    const mixer = useRef();
    const { actions } = useAnimations(animations, mixer);
    console.log(actions);

    useEffect(() => {
      actions.Dance.play()
    });

    // useEffect(() => {
    //   if (gltf.animations.length > 0) {
    //     mixer.current = new AnimationMixer(gltf.scene);
    //     const action = mixer.current.clipAction(gltf.animations[0]);
    //     action.play();
    //   }
    // }, [gltf]);
  
    // useFrame((state, delta) => {
    //   if (mixer.current) {
    //     mixer.current.update(delta);
    //   }
    // });
  
    // return <primitive object={nodes} scale={0.5} />;


    return (
      <group ref={mixer} dispose={null}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            material={materials.Ch03_Body}
            geometry={nodes.Ch03.geometry}
            skeleton={nodes.Ch03.skeleton}
          />
        </group>
      </group>
    );
  };


export default function AI() {
  const [data, setData] = useState(null);
  const [imageSrc, setImageSrc] = useState('RobotExpressive.glb');
  const [prevData, setPrevData] = useState(null);
  const [isWalking, setIsWalking] = useState(false); // Initial value is false
  const [counter, setCounter] = useState(0);
  // let counter = 0
  var res;

  // var prevString = "";
  // Fetch data from the server every 5 seconds
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/log', {method: "POST"});
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          res = await response.json();

          setData(res);
          setPrevData(res);
          setCounter(prevCounter => prevCounter + 1);

          console.log("isWalking:", isWalking)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Fetch data initially when the component mounts
      fetchData();
  
      // Set up interval to fetch data every 5 seconds
      const intervalId = setInterval(fetchData, 5000);
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    useEffect(()=>{
      console.log("data changed");
      // printData();
      setIsWalking(false);
      setCounter(0);
    }, [data])

    useEffect(() => {
      console.log("counter changed");
      console.log("counter: ", counter)
      if (counter > 2) {
        console.log("greater than 5");
        setIsWalking(true);
        setCounter(0); // Reset the counter
      }
    }, [counter]);

    const printData = () => {
      console.log('Data fetched:', data);
      console.log("prvString: ", prevData);
    }

    const gridContainer = {
      display: 'grid',
      gridTemplateColumns: 'auto auto'
    };

    const gridItem ={
      fontSize: '11px',
      textAlign: 'center'
    }

    const nodContent = `
      <model-viewer 
          src='RobotExpressive.glb'
          autoplay
          animation-name="Yes"
          animation-loop
          animation-playback-controls>
      </model-viewer>
    `;

    const walkingContent = `
      <model-viewer 
          src='RobotExpressive.glb'
          autoplay
          animation-name="Walking"
          camera-orbit="1deg"
          animation-loop
          animation-playback-controls>
      </model-viewer>
    `;

    const imgContent = `
      <div>
        <h1>Hello World</h1>
        <p>This is some HTML content.</p>
        <img src="logo512.png" alt="Description of the image" />
      </div>
    `;

    const scriptContent = `<script type="module" src="https://unpkg.com/@google/model-viewer"></script>`


    return (
        <div className="AI">
          <div style={gridContainer}>
            <div style={gridItem}>
              <div className="box3 sb13">
                {data}
              </div>
            </div>
            <div style={gridItem}>
              <Helmet>
                <script type="module" src="https://unpkg.com/@google/model-viewer"></script>
              </Helmet>
              {isWalking
                ? <div style={{height: '300px'}} dangerouslySetInnerHTML={{ __html: walkingContent }}></div>
                : <div style={{height: '300px'}} dangerouslySetInnerHTML={{ __html: nodContent }}></div>
              }
            </div>
          </div>
        </div>
    );
}


// export default function AI() {
//     const [data, setData] = useState(null);

//     // Fetch data from the server every 5 seconds
//     // TODO: GET THE DATA FORMATTED CORRECTLY
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch('http://localhost:3001/log', {method: "POST"});
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setData(data);
//             console.log('Data fetched:', data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         // Fetch data initially when the component mounts
//         fetchData();
    
//         // Set up interval to fetch data every 5 seconds
//         const intervalId = setInterval(fetchData, 5000);
    
//         // Clean up the interval when the component unmounts
//         return () => clearInterval(intervalId);
//       }, []); // Empty dependency array ensures this effect runs only once when the component mounts
    
//     // pipeline sends a msg to the server.js, server saves the msg & then updates a var that triggers the fetch function here to get the msg

  
//     return (
//       <div>
//         {data ? (
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         ) : (
//           <p>Loading data...</p>
//         )}
//       </div>
//     );
// };

  