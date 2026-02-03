import type { Asteroid, FeedResponse, OrbitalData } from "../types";

const FEED_URL = "https://api.nasa.gov/neo/rest/v1/feed?";
const LOOKUP_URL = "https://api.nasa.gov/neo/rest/v1/neo/";
const API_KEY: string = import.meta.env.VITE_NASA_API_KEY ?? "DEMO_KEY";

const formatDate = (d: Date) => d.toISOString().slice(0, 10)

export async function fetchAsteroids(
  start_date: Date, 
  end_date: Date, 
) {
  try {
    const response = await fetch(`${FEED_URL}start_date=${formatDate(start_date)}&end_date=${formatDate(end_date)}&api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json() as FeedResponse;
    return data.near_earth_objects
  } catch (error) {
    console.error(`Error fetching asteroids:`, error);
    return null;
  }
}

export async function fetchAsteroid(id: string) {
  try {
    const response = await fetch(`${LOOKUP_URL}${id}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json() as Asteroid;
  } catch (error) {
    console.error(`Error fetching asteroid ${id}:`, error);
    return null;
  }
}

const DEG2RAD = Math.PI / 180;
const DAY = 86400;
const JD_UNIX_EPOCH = 2440587.5;

function epochToSeconds(epoch: string): number {
  // Si parece número → Julian Day
  if (!isNaN(Number(epoch))) {
    const jd = Number(epoch);
    return (jd - JD_UNIX_EPOCH) * DAY;
  }

  // Si no → ISO string normal
  return Date.parse(epoch) / 1000;
}

export function calculatePositionAsteroid(
  el: OrbitalData,
  t: number
) {
  const a = parseFloat(el.semi_major_axis); // AU
  const e = parseFloat(el.eccentricity);
  const i = parseFloat(el.inclination) * DEG2RAD;
  const Omega = parseFloat(el.ascending_node_longitude) * DEG2RAD;
  const omega = parseFloat(el.perihelion_argument) * DEG2RAD;
  const M0 = parseFloat(el.mean_anomaly) * DEG2RAD;

  // mean_motion suele venir en grados/día
  const n = parseFloat(el.mean_motion) * DEG2RAD / DAY;

  // Tiempo desde epoch (usamos epoch_osculation)
  const t0 = epochToSeconds(el.epoch_osculation);
  const M = M0 + n * (t - t0);

  // Resolver Kepler: M = E - e sin E
  let E = M;
  for (let k = 0; k < 6; k++) {
    E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }

  // Plano orbital
  const xOrb = a * (Math.cos(E) - e);
  const yOrb = a * Math.sqrt(1 - e * e) * Math.sin(E);

  // Rotaciones a 3D
  const cosO = Math.cos(Omega);
  const sinO = Math.sin(Omega);
  const cosi = Math.cos(i);
  const sini = Math.sin(i);
  const cosw = Math.cos(omega);
  const sinw = Math.sin(omega);

  const x =
    (cosO * cosw - sinO * sinw * cosi) * xOrb +
    (-cosO * sinw - sinO * cosw * cosi) * yOrb;

  const y =
    (sinO * cosw + cosO * sinw * cosi) * xOrb +
    (-sinO * sinw + cosO * cosw * cosi) * yOrb;

  const z = sini * sinw * xOrb + sini * cosw * yOrb;

  return { x, y, z }; // AU
}
