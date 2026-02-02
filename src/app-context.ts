import { createContext, useContext } from "react"
import type { Asteroid, NearEarthObjects } from "./types"

export type AppState = {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  neos: NearEarthObjects
  setNeos: React.Dispatch<React.SetStateAction<NearEarthObjects>>
  asteroids: Asteroid[]
  setAsteroids: React.Dispatch<React.SetStateAction<Asteroid[]>>
  orbits: boolean
  setOrbits: React.Dispatch<React.SetStateAction<boolean>>
  movement: boolean
  setMovement: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<AppState | null>(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used inside AppProvider")
  return ctx
}
