import './styles.css'

export default function PurpleButton(props) {
  return (
    <div className='button-sign'>
      <button type='submit'>{props.name}</button>
    </div>
  )
}