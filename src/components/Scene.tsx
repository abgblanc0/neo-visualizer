import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { SOLAR_SYSTEM } from '../constants/solarSystem'
import { BASE_PLANET_RADIUS, PLANET_RADIUS_BY_NAME } from '../constants/scales'
import { useApp } from '../app-context'
import CelestialBody from './CelestialBody'

export default function Scene() {
  const { asteroids } = useApp();
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {Object.entries(SOLAR_SYSTEM).map(([name, orbital_data]) => (
        <CelestialBody 
          key={name} 
          name={name} 
          orbital_data={orbital_data} 
          radius={BASE_PLANET_RADIUS * (PLANET_RADIUS_BY_NAME[name] ?? 1)}
          color={name === "Earth" ? "green" : "blue"}
          orbitColor={name === "Earth" ? "green" : "white"}
          />
        ))}
      {asteroids.map((asteroid) => (
        <CelestialBody 
          key={asteroid.id} 
          name={asteroid.name}
          orbital_data={asteroid.orbital_data}
          radius={asteroid.estimated_diameter.kilometers.estimated_diameter_min}
          color="white"
          orbitColor="red"
          />))
      }
      <OrbitControls/>
    </Canvas>
  )
}