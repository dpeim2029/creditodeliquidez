import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls } from '@react-three/drei'
import IsometricHouse from './IsometricHouse'

export default function Hero3D() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      {/* Isometric orthographic camera */}
      <OrthographicCamera
        makeDefault
        position={[8, 6, 8]}
        zoom={65}
        near={0.1}
        far={100}
      />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.0}
        color="#fffaf0"
      />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.3}
        color="#e8f5e9"
      />
      {/* Subtle fill from below */}
      <hemisphereLight
        args={['#E8F5E9', '#F5F0E8', 0.4]}
      />

      <Suspense fallback={null}>
        <IsometricHouse />
      </Suspense>

      {/* Gentle user interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
        rotateSpeed={0.3}
      />
    </Canvas>
  )
}
