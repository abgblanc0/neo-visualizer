import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three";
import { useApp } from "../app-context";
import type { Asteroid } from "../types";
import { calculatePositionAsteroid } from "../api/neoApi";
import OrbitPath2 from "./OrbitPath2";


export default function Asteroid({ name , orbital_data}: Asteroid) {
  const { orbits, movement, date } = useApp()
  const ref = useRef<Mesh>(null!)
  const simTime = useRef(date.getSeconds());

  useFrame((_, delta) => {
    simTime.current += movement ? delta * 86400 * 10 : 0; // 10 days per second
    const p = calculatePositionAsteroid(orbital_data, simTime.current);
    ref.current.position.set(p.x * 10, p.y * 10, p.z * 10);
  });


  const pointerOver = () => {
    console.log(name)
  }

  return (
    <>
      <mesh ref={ref} onPointerOver={pointerOver}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {orbits && <OrbitPath2 orbitalData={orbital_data} scale={10} color="red"/>}
    </>
  )
}


