interface Props {
  id: string;
  name: string;
  danger: boolean;
}

export default function Item({ name, danger }: Props) {
  return (
    <li className="flex justify-between border text-white p-2">
      <h1>{name}</h1>
      {danger ? <h1>Yes</h1> : <h1>No</h1>} 
    </li>
  )
}