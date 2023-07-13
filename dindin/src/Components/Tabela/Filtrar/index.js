import './styles.css';
import iconFilter from '../../../assets/iconFilter.png';

export default function Filtrar() {
    return (
        <div className='cotainer-filtrar'>
            <img src={iconFilter} />

            <span>Filtrar</span>
        </div>
    )
}