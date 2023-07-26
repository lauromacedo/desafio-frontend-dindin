import "./styles.css";


export default function Chip({ title, checked }) {
  return (
    <div className={`chip ${checked ? "checked" : "unchecked"}`}>
      <span>{title}</span>
      {checked ? "x" : "+"}
    </div>
  )
}