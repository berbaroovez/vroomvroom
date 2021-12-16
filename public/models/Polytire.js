/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/polytire.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder002.geometry} material={materials.tire} />
      <mesh geometry={nodes.Cylinder002_1.geometry} material={materials.white} />
    </group>
  )
}

useGLTF.preload('/polytire.glb')