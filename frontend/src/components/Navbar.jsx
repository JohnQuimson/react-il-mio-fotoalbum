import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const urlPages = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Foto',
    href: '/fotos',
  },
  {
    label: 'Contatti',
    href: '/contacts',
  },
];

export default function () {
  const { isLoggedIn, logout, user } = useAuth();
  return (
    <header>
      <nav className="navbar">
        <menu>
          {urlPages.map(({ label, href }, i) => (
            <li key={`urlPage${i}`}>
              <NavLink to={href}>{label}</NavLink>
            </li>
          ))}
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to={`/login`}>Login</NavLink>
              </li>
              <li>
                <NavLink to={`/signup`}>Registrati</NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li>
              {user.name && <h3>{user.name}</h3>}
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </menu>
      </nav>
    </header>
  );
}
