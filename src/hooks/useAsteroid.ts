import { useEffect } from "react";
import type { NearEarthObject } from "../types";

export default function useAsteroid(asteroids: NearEarthObject[]) {
  useEffect(() => {
    console.log(asteroids)
  }, [asteroids])
}