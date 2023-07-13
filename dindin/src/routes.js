import {
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function ProtectedRoutes({ redirectTo }) {
  const token = localStorage.getItem('token');

  return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function MyRoutes() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />

      <Route element={<ProtectedRoutes redirectTo={"/sign-in"} />}>
        <Route path='/home' element={<Home />} />
      </Route>

    </Routes>
  )
}

