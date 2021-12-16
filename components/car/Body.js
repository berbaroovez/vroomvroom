import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { forwardRef, useRef } from "react";
import { useBox, useCylinder } from "@react-three/cannon";
const Body = forwardRef(({ ...props }, ref) => {
  const [, api] = useBox(
    () => ({
      //set mass of car
      // type: "Kinematic",
      mass: 500,
      allowSleep: false,
      args: [2, 1, 5],
      ...props,
    }),
    ref
  );

  const { nodes, materials } = useGLTF("/models/polycar.glb");
  return (
    <mesh ref={ref} api={api}>
      <group dispose={null} position={[0, 0, 0.5]} rotation={[0, Math.PI, 0]}>
        <mesh
          geometry={nodes.Cube_1.geometry}
          material={nodes.Cube_1.material}
        />
        <mesh
          geometry={nodes.Cube_2.geometry}
          material={materials["window.001"]}
        />
        <mesh geometry={nodes.Cube_3.geometry} material={materials.numpers} />
        <group position={[-0.76, 0.16, -1.77]} scale={[-0.16, -0.07, -0.03]}>
          <mesh
            geometry={nodes.Cube001_1.geometry}
            material={nodes.Cube001_1.material}
          />
          <mesh
            geometry={nodes.Cube001_2.geometry}
            material={nodes.Cube001_2.material}
          />
        </group>
        <group position={[-1.23, 0.52, -0.14]} scale={[-0.14, -0.06, -0.04]}>
          <mesh
            geometry={nodes.Cube003_1.geometry}
            material={nodes.Cube003_1.material}
          />
          <mesh
            geometry={nodes.Cube003_2.geometry}
            material={nodes.Cube003_2.material}
          />
        </group>
        <group position={[-1.23, 0.52, -0.14]} scale={[-0.14, -0.06, -0.04]}>
          <mesh
            geometry={nodes.Cube004_1.geometry}
            material={nodes.Cube004_1.material}
          />
          <mesh
            geometry={nodes.Cube004_2.geometry}
            material={nodes.Cube004_2.material}
          />
        </group>
        <group position={[-0.76, 0.16, -1.77]} scale={[-0.16, -0.07, -0.03]}>
          <mesh
            geometry={nodes.Cube005_1.geometry}
            material={nodes.Cube005_1.material}
          />
          <mesh
            geometry={nodes.Cube005_2.geometry}
            material={nodes.Cube005_2.material}
          />
        </group>
      </group>
    </mesh>
  );
});

export default Body;

useGLTF.preload("/models/polycar.glb");
