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
      <nav className="d-flex justify-content-between">
        <div className="cont-logo">Logo</div>
        <ul className="d-flex justify-content-around list-unstyled ">
          {urlPages.map(({ label, href }, i) => (
            <li key={`urlPage${i}`} className="mx-2">
              <NavLink to={href}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
