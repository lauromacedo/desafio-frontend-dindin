import './styles.css';
import imgData from '../../../assets/PolygonData.svg';




export default function HeaderTabela() {
    return (

        <div className='container-header-tabela'>

            <div className='header-tabela'>
                <div className='data-header'>
                    <span>Data</span>

                    <img src={imgData} alt='ordenar data' />
                </div>
                <div>Dia da semana</div>
                <div>Descrição</div>
                <div>Categoria</div>
                <div>Valor</div>
                <div></div>
            </div>
        </div>

    )
}