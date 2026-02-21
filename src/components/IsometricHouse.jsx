import React, { useRef, useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── colour palette (matches site accent) ─── */
const C = {
  wall:     '#F5F0E8',
  wallSide: '#E8E0D0',
  roof:     '#1B5E3B',
  roofEdge: '#14482E',
  door:     '#14482E',
  doorKnob: '#C8A84E',
  window:   '#B8D8E8',
  windowFrame: '#E0D8C8',
  chimney:  '#D4A574',
  chimneyTop: '#B8876A',
  foundation: '#D8D4CC',
  ground:   '#E8E4DC',
  bill:     '#1B5E3B',
  billLight:'#2E7D4F',
  coin:     '#DAA520',
  coinEdge: '#C8941E',
}

/* ─── HOUSE ─── */
function House() {
  const groupRef = useRef()

  // Gentle idle bob
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      {/* Foundation / base platform */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.2, 0.15, 2.6]} />
        <meshStandardMaterial color={C.foundation} />
      </mesh>

      {/* Main walls */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[3, 1.85, 2.4]} />
        <meshStandardMaterial color={C.wall} />
      </mesh>

      {/* Left wall tint (side shading) */}
      <mesh position={[-1.501, 0.95, 0]}>
        <planeGeometry args={[2.4, 1.85]} />
        <meshStandardMaterial color={C.wallSide} side={THREE.DoubleSide} />
      </mesh>

      {/* Roof - two angled planes forming gable */}
      <RoofGable />

      {/* Door */}
      <mesh position={[0.4, 0.55, 1.201]}>
        <boxGeometry args={[0.65, 1.1, 0.04]} />
        <meshStandardMaterial color={C.door} />
      </mesh>
      {/* Door knob */}
      <mesh position={[0.62, 0.5, 1.23]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={C.doorKnob} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Door frame top */}
      <mesh position={[0.4, 1.12, 1.205]}>
        <boxGeometry args={[0.75, 0.06, 0.05]} />
        <meshStandardMaterial color={C.windowFrame} />
      </mesh>

      {/* Front windows */}
      <Window position={[-0.65, 1.05, 1.201]} />
      <Window position={[-0.65, 1.05, -1.201]} rotation={[0, Math.PI, 0]} />

      {/* Side windows */}
      <Window position={[1.501, 1.05, -0.4]} rotation={[0, Math.PI / 2, 0]} />
      <Window position={[1.501, 1.05, 0.4]} rotation={[0, Math.PI / 2, 0]} />
      <Window position={[-1.501, 1.05, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Chimney */}
      <mesh position={[-0.7, 2.45, -0.5]}>
        <boxGeometry args={[0.4, 0.7, 0.4]} />
        <meshStandardMaterial color={C.chimney} />
      </mesh>
      <mesh position={[-0.7, 2.82, -0.5]}>
        <boxGeometry args={[0.48, 0.08, 0.48]} />
        <meshStandardMaterial color={C.chimneyTop} />
      </mesh>

      {/* Small step at door */}
      <mesh position={[0.4, 0.02, 1.45]}>
        <boxGeometry args={[0.8, 0.08, 0.3]} />
        <meshStandardMaterial color={C.foundation} />
      </mesh>
    </group>
  )
}

/* ─── GABLE ROOF ─── */
function RoofGable() {
  const geometry = useMemo(() => {
    // Triangular prism for gable roof
    const hw = 1.65   // half width
    const hd = 1.35   // half depth
    const rh = 0.85   // roof height
    const base = 1.875 // base y

    const vertices = new Float32Array([
      // Front face (triangle)
      -hw, base, hd,
       hw, base, hd,
       0,  base + rh, hd,
      // Back face (triangle)
       hw, base, -hd,
      -hw, base, -hd,
       0,  base + rh, -hd,
      // Left slope
      -hw, base, hd,
       0,  base + rh, hd,
       0,  base + rh, -hd,
      -hw, base, -hd,
      // Right slope
       hw, base, -hd,
       0,  base + rh, -hd,
       0,  base + rh, hd,
       hw, base, hd,
      // Bottom
      -hw, base, hd,
      -hw, base, -hd,
       hw, base, -hd,
       hw, base, hd,
    ])

    const indices = [
      0, 1, 2,       // front
      3, 4, 5,       // back
      6, 7, 8,  6, 8, 9,    // left slope
      10, 11, 12, 10, 12, 13, // right slope
      14, 15, 16, 14, 16, 17, // bottom
    ]

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={C.roof} side={THREE.DoubleSide} />
      </mesh>
      {/* Roof edge trim */}
      <mesh position={[0, 2.725, 1.36]}>
        <boxGeometry args={[3.4, 0.06, 0.06]} />
        <meshStandardMaterial color={C.roofEdge} />
      </mesh>
      <mesh position={[0, 2.725, -1.36]}>
        <boxGeometry args={[3.4, 0.06, 0.06]} />
        <meshStandardMaterial color={C.roofEdge} />
      </mesh>
      {/* Ridge */}
      <mesh position={[0, 2.725, 0]}>
        <boxGeometry args={[0.08, 0.08, 2.75]} />
        <meshStandardMaterial color={C.roofEdge} />
      </mesh>
    </group>
  )
}

/* ─── WINDOW ─── */
function Window({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Glass */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.45, 0.45, 0.03]} />
        <meshStandardMaterial
          color={C.window}
          transparent
          opacity={0.7}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      {/* Frame */}
      <mesh position={[0, 0, 0.005]}>
        <boxGeometry args={[0.52, 0.05, 0.035]} />
        <meshStandardMaterial color={C.windowFrame} />
      </mesh>
      <mesh position={[0, 0, 0.005]}>
        <boxGeometry args={[0.05, 0.52, 0.035]} />
        <meshStandardMaterial color={C.windowFrame} />
      </mesh>
      {/* Outer frame */}
      <mesh position={[0, 0.255, 0.005]}>
        <boxGeometry args={[0.55, 0.04, 0.04]} />
        <meshStandardMaterial color={C.windowFrame} />
      </mesh>
      <mesh position={[0, -0.255, 0.005]}>
        <boxGeometry args={[0.56, 0.05, 0.04]} />
        <meshStandardMaterial color={C.windowFrame} />
      </mesh>
    </group>
  )
}

/* ─── MONEY BILL (single) ─── */
function Bill({ startPos, speed, delay, swayAmp, swayFreq, rotSpeed, index }) {
  const ref = useRef()
  const matRef = useRef()

  useFrame(() => {
    if (!ref.current) return
    const t = ((Date.now() * 0.001 * speed) + delay) % 4 // cycle every ~4s
    const progress = t / 4

    // Rise from house chimney area
    ref.current.position.x = startPos[0] + Math.sin(t * swayFreq) * swayAmp
    ref.current.position.y = startPos[1] + progress * 3.5
    ref.current.position.z = startPos[2] + Math.cos(t * swayFreq * 0.7) * swayAmp * 0.5

    // Tumble rotation
    ref.current.rotation.x = t * rotSpeed * 0.5
    ref.current.rotation.y = t * rotSpeed
    ref.current.rotation.z = Math.sin(t * 2) * 0.3

    // Fade out as it rises
    if (matRef.current) {
      matRef.current.opacity = progress < 0.15
        ? progress / 0.15
        : progress > 0.7
          ? 1 - ((progress - 0.7) / 0.3)
          : 1
    }
  })

  const color = index % 3 === 0 ? C.billLight : C.bill

  return (
    <mesh ref={ref} position={startPos}>
      <planeGeometry args={[0.35, 0.18]} />
      <meshStandardMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        metalness={0.1}
        roughness={0.6}
      />
    </mesh>
  )
}

/* ─── COIN (single) ─── */
function Coin({ startPos, speed, delay, swayAmp, rotSpeed, index }) {
  const ref = useRef()
  const matRef = useRef()

  useFrame(() => {
    if (!ref.current) return
    const t = ((Date.now() * 0.001 * speed) + delay) % 5
    const progress = t / 5

    ref.current.position.x = startPos[0] + Math.sin(t * 1.5) * swayAmp * 0.6
    ref.current.position.y = startPos[1] + progress * 2.8
    ref.current.position.z = startPos[2] + Math.cos(t * 1.2) * swayAmp * 0.4

    ref.current.rotation.y = t * rotSpeed
    ref.current.rotation.x = Math.PI * 0.5 + Math.sin(t) * 0.2

    if (matRef.current) {
      matRef.current.opacity = progress < 0.12
        ? progress / 0.12
        : progress > 0.65
          ? 1 - ((progress - 0.65) / 0.35)
          : 1
    }
  })

  return (
    <mesh ref={ref} position={startPos}>
      <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
      <meshStandardMaterial
        ref={matRef}
        color={C.coin}
        transparent
        opacity={0}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

/* ─── MONEY PARTICLES ─── */
function MoneyParticles() {
  const bills = useMemo(() => {
    const items = []
    for (let i = 0; i < 14; i++) {
      items.push({
        startPos: [
          -0.7 + (Math.random() - 0.5) * 0.6,
          2.6 + Math.random() * 0.3,
          -0.5 + (Math.random() - 0.5) * 0.6,
        ],
        speed: 0.3 + Math.random() * 0.25,
        delay: Math.random() * 4,
        swayAmp: 0.3 + Math.random() * 0.5,
        swayFreq: 1.5 + Math.random() * 1.5,
        rotSpeed: 1 + Math.random() * 2,
        index: i,
      })
    }
    return items
  }, [])

  const coins = useMemo(() => {
    const items = []
    for (let i = 0; i < 6; i++) {
      items.push({
        startPos: [
          -0.7 + (Math.random() - 0.5) * 0.5,
          2.5 + Math.random() * 0.2,
          -0.5 + (Math.random() - 0.5) * 0.5,
        ],
        speed: 0.25 + Math.random() * 0.2,
        delay: Math.random() * 5,
        swayAmp: 0.25 + Math.random() * 0.35,
        rotSpeed: 2 + Math.random() * 3,
        index: i,
      })
    }
    return items
  }, [])

  // Bills coming from door area too
  const doorBills = useMemo(() => {
    const items = []
    for (let i = 0; i < 6; i++) {
      items.push({
        startPos: [
          0.4 + (Math.random() - 0.5) * 0.3,
          0.8 + Math.random() * 0.3,
          1.3 + Math.random() * 0.2,
        ],
        speed: 0.2 + Math.random() * 0.2,
        delay: Math.random() * 4,
        swayAmp: 0.4 + Math.random() * 0.4,
        swayFreq: 1 + Math.random() * 1,
        rotSpeed: 0.8 + Math.random() * 1.5,
        index: i + 14,
      })
    }
    return items
  }, [])

  return (
    <group>
      {bills.map((b, i) => <Bill key={`b${i}`} {...b} />)}
      {doorBills.map((b, i) => <Bill key={`db${i}`} {...b} />)}
      {coins.map((c, i) => <Coin key={`c${i}`} {...c} />)}
    </group>
  )
}

/* ─── GROUND ─── */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.13, 0]} receiveShadow>
      <circleGeometry args={[4.5, 48]} />
      <meshStandardMaterial color={C.ground} />
    </mesh>
  )
}

/* ─── AMBIENT SPARKLES ─── */
function Sparkles() {
  const ref = useRef()
  const count = 30
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 6
      arr[i * 3 + 1] = Math.random() * 5 + 1
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [])

  const sizes = useMemo(() => {
    const arr = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      arr[i] = 0.02 + Math.random() * 0.03
    }
    return arr
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const posArr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += 0.003
      if (posArr[i * 3 + 1] > 6) posArr[i * 3 + 1] = 0.5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#DAA520"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

/* ─── MAIN SCENE EXPORT ─── */
export default function IsometricHouse() {
  const sceneRef = useRef()

  // Very gentle scene rotation
  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08 + Math.PI * 0.25
    }
  })

  return (
    <group ref={sceneRef} rotation={[0, Math.PI * 0.25, 0]}>
      <House />
      <MoneyParticles />
      <Ground />
      <Sparkles />
    </group>
  )
}
