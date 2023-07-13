import './style.css'

import Logo from '../../assets/logo.svg';

export default function LoginHead() {
  return (
    <div className="header">
      <img src={Logo} alt="logo" />
    </div>
  );
}