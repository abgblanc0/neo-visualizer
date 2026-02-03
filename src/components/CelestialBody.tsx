import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import type { Mesh } from "three"
import { calculatePositionAsteroid } from "../api/neoApi"
import { useApp } from "../app-context"
import type { OrbitalData } from "../types"
import OrbitPath2 from "./OrbitPath2"
import { DISTANCE_SCALE } from "../constants/scales";

interface Props {
  name: string,
  orbital_data: OrbitalData,
  radius: number
  color: string
  orbitColor: string
}

export default function CelestialBody({ name, orbital_data, radius, color, orbitColor }: Props) {
  const { orbits, movement, date } = useApp()
  const ref = useRef<Mesh>(null!)
  const simTime = useRef(date.getTime() / 1000);

  useEffect(() => {
    simTime.current = date.getTime() / 1000
  }, [date])

  useFrame((_, delta) => {
    if (movement) {
      simTime.current += delta * 86400 * 10
    }
    else {
      simTime.current = date.getTime() / 1000
    }
    const p = calculatePositionAsteroid(orbital_data, simTime.current);
    ref.current.position.set(p.x * DISTANCE_SCALE, p.y * DISTANCE_SCALE, p.z * DISTANCE_SCALE);
  });


  const pointerOver = () => {
    console.log(name)
  }

  return (
    <>
      <mesh ref={ref} onPointerOver={pointerOver}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {orbits && <OrbitPath2 orbitalData={orbital_data} scale={DISTANCE_SCALE} color={orbitColor}/>}
    </>
  )
}