import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/static_assets/RobotExpressive.gltf");
  return (
    <>
      <primitive object={gltf.scene} />
    </>
  );
};
export default Model;