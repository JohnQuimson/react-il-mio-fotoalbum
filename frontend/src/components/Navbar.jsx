import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const urlPages = [
  {
    label: 'Home',
    href: '/',
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
      <nav className="navbar px-3">
        <NavLink to={`/`}>
          <div className="cont-logo">
            <img src="/logo.png" alt="logo" />
          </div>
        </NavLink>

        <menu className="d-flex align-items-center list-unstyled ">
          {urlPages.map(({ label, href }, i) => (
            <li key={`urlPage${i}`} className="mx-3 ">
              <NavLink to={href} className="text-decoration-none">
                {label}
              </NavLink>
            </li>
          ))}
          {isLoggedIn && (
            <>
              <li className="d-flex flex-column align-items-center access">
                <NavLink to={`/messages`} className="message">
                  Messaggi
                </NavLink>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className="d-flex flex-column align-items-center access">
                <NavLink to={`/login`} className="login-btn">
                  Login
                </NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li className="user">
              {user.name && <span>{user.name}</span>}
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </menu>
      </nav>
    </header>
  );
}
