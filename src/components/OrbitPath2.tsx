import { Line } from "@react-three/drei";
import type { OrbitalData, PlanetOrbitalData } from "../types";

const DEG2RAD = Math.PI / 180;

interface OrbitPathProps {
  orbitalData: OrbitalData | PlanetOrbitalData ;
  segments?: number;
  scale?: number;
  color?: string;
}

export default function OrbitPath2({
  orbitalData,
  segments = 256,
  scale = 1,
  color = "white",
}: OrbitPathProps) {
  const a = parseFloat(orbitalData.semi_major_axis); // AU
  const e = parseFloat(orbitalData.eccentricity);
  const i = parseFloat(orbitalData.inclination) * DEG2RAD;
  const Omega = parseFloat(orbitalData.ascending_node_longitude) * DEG2RAD;
  const omega = parseFloat(orbitalData.perihelion_argument) * DEG2RAD;

  const points = Array.from({ length: segments + 1 }, (_, k) => {
    const E = (k / segments) * Math.PI * 2;

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

    return [x * scale, y * scale, z * scale] as [number, number, number];
  });

  return <Line points={points} color={color}/>;
}
