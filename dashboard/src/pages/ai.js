import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useFrame, useEffect, useRef, useState } from "react";
import { AnimationMixer } from "three";
import axios from 'axios';
// import { bodyString } from './server.js';

const Model = () => {
    const gltf = useLoader(GLTFLoader, "RobotExpressive.glb");
    const modelRef = useRef();
    const mixer = useRef();
  
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
  
    return <primitive object={gltf.scene} scale={1} />;
  };

// export default function AI() {
//     const [requestData, setRequestData] = useState('');

//     useEffect(() => {
//         const sendRequest = async () => {
//           try {
//             console.log('Sending request to server');
//             const response = await axios.post('http://localhost:3001/log', { message: 'Hello from React!' });
//             setRequestData(response.data);
//             console.log('Server response:', response.data)
//           } catch (error) {
//             console.error('Error sending request:', error);
//           }
//         };
    
//         // Send the request when the component mounts
//         sendRequest();
  
//       }, []); // Empty dependency array ensures this effect runs only once when the component mounts
    

//     return (
//         <div className="AI">
//         <Canvas>
//             <Suspense fallback={null}>
//             <Model />
//             <OrbitControls />
//             {/* <Environment preset="sunset" background /> */}
//             <ambientLight intensity={5}/>
//             {/* <pointLight position={[100, 100, 100]} /> */}
//             </Suspense>
//         </Canvas>
//         </div>
//     );
// }


export default function AI() {
    const [data, setData] = useState(null);

    // Fetch data from the server every 5 seconds
    // TODO: GET THE DATA FORMATTED CORRECTLY
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3001/log', {method: "POST"});
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.body;
            setData(data);
            console.log('Data fetched:', data);
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
    
    // pipeline sends a msg to the server.js, server saves the msg & then updates a var that triggers the fetch function here to get the msg

  
    return (
      <div>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
};

  