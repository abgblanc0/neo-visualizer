import { useApp } from "../app-context";
import Item from "./Item";

export default function Form() {
  const {orbits, movement, setOrbits, setMovement, neos, date, setDate} = useApp()
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    setMovement(false)
    setDate(new Date(e.target.value) ) 
  }

  const className= ( off: boolean ) => "text-white p-2 border rounded" + (off ? " bg-red-600" : " bg-green-600")
  return (
    <div className="w-64 mt-10 fixed top-0 left-10 z-50">
      <div className="flex gap-1">
        <button className={className(!orbits)} onClick={() => setOrbits(!orbits)} type="button">OrbitsTrace</button>
        <button className={className(!movement)} onClick={() => setMovement(!movement)} type="button">Movement</button>
        <input type="date" value={date.toISOString().slice(0, 10)} onChange={onChange} />
      </div>
      {
        neos && Object.entries(neos).map(([date, neo]) =>
          <ul key={date} className="flex flex-col gap-2 h-[500px] overflow-y-scroll mt-2">
            {neo.map((asteroid) => 
              <Item key={asteroid.id} id={asteroid.id} name={asteroid.name} danger={asteroid.is_potentially_hazardous_asteroid} />
            )}
          </ul>
        )
      }
    </div>
  )
}