import { useEffect, useState } from "react"
import { AppContext } from "./app-context"
import type { Asteroid, NearEarthObjects } from "./types"
import { fetchAsteroids, fetchAsteroid } from "./api/neoApi"

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([])
  const [neos, setNeos] = useState<NearEarthObjects>({})
  const [orbits, setOrbits] = useState(true)
  const [movement, setMovement] = useState(false)
  const [date, setDate] = useState(new Date())
  
  useEffect(() => {
    const loadAsteroids = async () => {
      const asteroids = await fetchAsteroids(date, date);
      if (!asteroids) return
      setNeos(asteroids);
    }
    loadAsteroids();
  }, [date])

  useEffect(() => {
    if (!neos) return

    const loadAsteroids = async () => {
      const todayKey = date.toISOString().slice(0, 10);
      const asteroidList = neos[todayKey] || [];
      
      const promises = asteroidList.map(ast => fetchAsteroid(ast.id));
      const responses = await Promise.all(promises);
      
      const validAsteroids = responses.filter(r => r !== null);
      setAsteroids(validAsteroids);
    };

    loadAsteroids();
  }, [neos, date]);


  return (
    <AppContext.Provider
      value={{ asteroids, setAsteroids, orbits, setOrbits, movement, setMovement, neos, setNeos, date, setDate }}
    >
      {children}
    </AppContext.Provider>
  )
}
