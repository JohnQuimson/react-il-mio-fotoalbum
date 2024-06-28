import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function () {
  const { signup } = useAuth();

  const initialData = {
    email: 'provarec@gmail.com',
    password: 'Password',
    name: 'Provaa',
  };

  const [formData, setFormData] = useState(initialData);

  const [signupError, setSignupError] = useState(null);

  const changeData = (key, value) => {
    setFormData((curr) => ({
      ...curr,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      setFormData(initialData);
    } catch (err) {
      setSignupError(err);
    }
  };

  return (
    <>
      <h1>Registrati</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => changeData('email', e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={(e) => changeData('password', e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome da visualizzare"
          value={formData.name}
          onChange={(e) => changeData('name', e.target.value)}
        />

        {signupError !== null && (
          <div className="error">{signupError.message}</div>
        )}
        {signupError?.errors &&
          signupError.errors.map((err, index) => (
            <div key={`err${index}`}>{err.msg}</div>
          ))}
        <button>Registrati</button>
      </form>
    </>
  );
}
