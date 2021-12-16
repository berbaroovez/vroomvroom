import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { forwardRef, useRef } from "react";
import { useCylinder } from "@react-three/cannon";
const Tire = forwardRef(
  ({ radius = 0.7, leftSide, scale = 0.7, ...props }, ref) => {
    useCylinder(
      () => ({
        //set mass of wheel
        mass: 1,
        //set type
        type: "Kinematic",
        //material name
        material: "tire",
        //make it so the wheel has no collision
        collisionFilterGroup: 0,
        //args order is radius bottom, top , height, number of segments to build cylinder out of
        args: [radius, radius, 0.5, 14],
        ...props,
      }),
      ref
    );
    const group = useRef();
    const { nodes, materials } = useGLTF("/models/polytire.glb");
    return (
      // We rotate tires because we modeling them facing straight up in blender
      // dont worry about the debug mesh facing the wrong direction is a bug
      <mesh ref={ref}>
        {/* This scale flips the tires depending on the side so we can see the rims */}
        <group rotation={[0, 0, Math.PI / 2]}>
          <group scale={radius}>
            <group scale={leftSide ? -1 : 1}>
              <mesh
                geometry={nodes.Cylinder002.geometry}
                material={materials.tire}
              />
              <mesh
                geometry={nodes.Cylinder002_1.geometry}
                material={materials.white}
              />
            </group>
          </group>
        </group>
      </mesh>
    );
  }
);

export default Tire;

useGLTF.preload("/models/polytire.glb");
