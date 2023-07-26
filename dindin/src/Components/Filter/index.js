import './styles.css';
import iconFilter from '../../assets/iconFilter.png';
import { useState } from 'react';
import Chip from '../Chip';

export default function Filter() {
    const [open, setOpen] = useState(false)
    return (
        <div className='main-filter'>
            <div className='filter-btn' onClick={() => setOpen(!open)}>
                <img src={iconFilter} />
                <span>Filtrar</span>
            </div>
            {open &&
                <div className='filter-body'>
                    <strong>Categoria</strong>
                    <div className='filter-categories'>
                        <Chip checked={true} title="Compras" />
                        <Chip checked={false} title="Lazer" />

                    </div>
                    <div className='btns-filter'>
                        <div className='clear-filter'>Limpar Filtros</div>
                        <div className='apply-filter'>Aplicar Filtros</div>
                    </div>
                </div>

            }
        </div>
    )
}