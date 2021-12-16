import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import { Physics, Debug, usePlane } from "@react-three/cannon";
import Vehicle from "../components/car/Vehicle";
const Plane = () => {
  const [ref, api] = usePlane(() => ({
    mass: 0,
    // type: "Static",
    rotation: [Math.PI / -2, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial attach="material" color="#cc5f5f" />
    </mesh>
  );
};

export default function ComponentName() {
  return (
    <Canvas camera={{ position: [1, 4, 10] }}>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Physics>
        {/* <Debug color="red"> */}
        <Vehicle />
        <Plane />
        {/* </Debug> */}
      </Physics>
    </Canvas>
  );
}
