import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Planet from './Planet'
import { SOLAR_SYSTEM } from '../api/solarSystem'
import { useApp } from '../app-context'
import Asteroid from './Asteroid';

export default function Scene() {
  const { asteroids } = useApp();
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {Object.entries(SOLAR_SYSTEM).map(([name, orbital_data]) => (<Planet key={name} name={name} orbital_data={orbital_data} />))}
      {asteroids.map((asteroid) => (<Asteroid key={asteroid.id} {...asteroid} />))}
      <OrbitControls enablePan={false}/>
    </Canvas>
  )
}