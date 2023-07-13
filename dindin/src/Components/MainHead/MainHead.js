import './styles.css';

import Logo from '../../assets/logo.svg';
import ImageProfile from '../../assets/profile.svg'
import Logout from '../../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import { clearAll } from '../../utils/localStorage';

export default function MainHead({ name, setModalEditarPerfil }) {
  const navigate = useNavigate();

  function handleExit() {
    clearAll();
    navigate('/sign-in')
  }



  return (
    <div className='header-main'>
      <div className='logo-header'>
        <img src={Logo} alt="logo" />
      </div>
      <div className='links-header'>
        <img src={ImageProfile} onClick={() => setModalEditarPerfil(true)} alt='profile' />
        <p>{name}</p>
        <img src={Logout} alt='logout' onClick={handleExit} />
      </div>
    </div>
  )
}