import { Link, NavLink } from 'react-router-dom';

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
  return (
    <header>
      <nav>
        <menu>
          {urlPages.map(({ label, href }, i) => (
            <li key={`urlPage${i}`}>
              <NavLink to={href}>{label}</NavLink>
            </li>
          ))}
        </menu>
      </nav>
    </header>
  );
}
