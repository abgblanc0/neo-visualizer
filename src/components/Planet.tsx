import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three";
import type { Planet } from "../types";
import { useApp } from "../app-context";
import OrbitPath2 from "./OrbitPath2";
import { calculatePositionAsteroid } from "../api/neoApi";


export default function Planet({ name, orbital_data }: Planet) {
  const { orbits, movement, date } = useApp()
  const ref = useRef<Mesh>(null!)
  const simTime = useRef(date.getSeconds());

  useFrame((_, delta) => {
    simTime.current += movement ? delta * 86400 * 10 : date.getSeconds(); // 10 days per second
    const p = calculatePositionAsteroid(orbital_data, simTime.current);
    ref.current.position.set(p.x * 10, p.y * 10, p.z * 10);
  });


  const pointerOver = () => {
    console.log(name)
  }

  return (
    <>
      <mesh ref={ref} onPointerOver={pointerOver}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color="blue"/>
      </mesh>
      {orbits && <OrbitPath2 orbitalData={orbital_data} scale={10} color={name === "Earth" ? "green" : "white"}/>}
    </>
  )
}
