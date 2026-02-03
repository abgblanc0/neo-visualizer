export interface FeedResponse {
  near_earth_objects: NearEarthObjects
}

export interface NearEarthObjects {
  [date: string]: NearEarthObject[]
}

export interface NearEarthObject {
  id: string
  neo_reference_id: string
  name: string
  absolute_magnitude_h: number
  estimated_diameter: EstimatedDiameter
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: CloseApproachData[]
  is_sentry_object: boolean
}

export interface CloseApproachData {
  close_approach_date: string
  close_approach_date_full: string
  epoch_date_close_approach: number
  miss_distance: MissDistance
  orbiting_body: string
}

export interface MissDistance {
  astronomical: string
  lunar: string
  kilometers: string
  miles: string
}

export interface Planet {
  name: string
  orbital_data: OrbitalData
}

export interface Asteroid {
  id: string
  neo_reference_id: string
  name: string
  name_limited: string
  designation: string
  nasa_jpl_url: string
  absolute_magnitude_h: number
  estimated_diameter: EstimatedDiameter
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: CloseApproachData[]
  orbital_data: OrbitalData
  is_sentry_object: boolean
}

export interface EstimatedDiameter {
  kilometers: Kilometers
}

export interface Kilometers {
  estimated_diameter_min: number
  estimated_diameter_max: number
}

export interface SolarSystem {
  [key: string]: OrbitalData
}

export interface OrbitalData {
  orbit_id: string
  orbit_determination_date: string
  first_observation_date: string
  last_observation_date: string
  orbit_uncertainty: string
  minimum_orbit_intersection: string
  jupiter_tisserand_invariant: string
  epoch_osculation: string
  eccentricity: string
  semi_major_axis: string
  inclination: string
  ascending_node_longitude: string
  orbital_period: string
  perihelion_distance: string
  perihelion_argument: string
  aphelion_distance: string
  perihelion_time: string
  mean_anomaly: string
  mean_motion: string
  equinox: string
  orbit_class: OrbitClass
}

export interface OrbitClass {
  orbit_class_type: string
  orbit_class_description: string
  orbit_class_range: string
}