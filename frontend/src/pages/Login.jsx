import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

export default function () {
  const { login } = useAuth();

  const initialData = {
    email: 'john@gmail.com',
    password: 'Password',
  };

  const [formData, setFormData] = useState(initialData);

  const [loginError, setLoginError] = useState(null);

  const changeData = (key, value) => {
    setFormData((curr) => ({
      ...curr,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      setFormData(initialData);
    } catch (err) {
      setLoginError(err);
    }
  };

  return (
    <>
      <section id="login">
        <h1>Login</h1>
        <div className="login-form-cont">
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => changeData('email', e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => changeData('password', e.target.value)}
            />
            {loginError !== null && (
              <div className="error">{loginError.message}</div>
            )}
            {loginError?.errors &&
              loginError.errors.map((err, index) => (
                <div key={`err${index}`}>{err.msg}</div>
              ))}
            <button>Loggati</button>
            <NavLink to={`/signup`} className="register">
              Non hai un account? Registrati
            </NavLink>
          </form>
        </div>
      </section>
    </>
  );
}
