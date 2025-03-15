import React from "react";
import { useLoader, useFrame } from '@react-three/fiber';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader, Color } from "three";
import { useRef, useState, useEffect } from 'react';

const PokemonCard3D = ({ imageUrl }) => {
  const frontTexture = useLoader(TextureLoader, imageUrl);
  const backTexture = useLoader(TextureLoader, '/tcg-card-back.jpg');
  const alphaTexture = useLoader(TextureLoader, '/alpha-map.png');

  const cardRef = useRef();

  return (
    <group ref={cardRef}>
      {/* Front face */}
      <mesh  position={[-0.001, 0, 0]}>
        <planeGeometry/>
        <meshStandardMaterial  
          map={frontTexture}
          alphaMap={alphaTexture}
          roughness={0.3}
          transparent={true}
        />
      </mesh>

      {/* Back face */}
      <mesh position={[0.001, 0, 0]} rotation={[0, Math.PI, 0]}>
        <planeGeometry/>
        <meshStandardMaterial  
          map={backTexture} 
          alphaMap={alphaTexture}
          roughness={0.3}
          transparent={true}
        />
      </mesh>
    </group>
  );
};

const CardViewer = ({ imageUrl }) => {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Canvas camera={{ position: [0, 0, 1.2] }}>
          <ambientLight intensity={4} />
          <PokemonCard3D imageUrl={imageUrl} />
          <OrbitControls autoRotate autoRotateSpeed={0.2} enablePan={false} enableZoom={false} />
        </Canvas>
      </div>
    );
  };

export default CardViewer;

  