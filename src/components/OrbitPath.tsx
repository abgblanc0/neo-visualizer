import { Line } from "@react-three/drei"

interface OrbitPathProps {
  a: number
  b: number
  segments?: number
}

export function OrbitPath({ a, b, segments = 128 }: OrbitPathProps) {
  const points = Array.from({ length: segments + 1 }, (_, i) => {
    const t = (i / segments) * Math.PI * 2
    return [Math.cos(t) * a, 0, Math.sin(t) * b] as [number, number, number]
  })

  return <Line points={points} />
}
