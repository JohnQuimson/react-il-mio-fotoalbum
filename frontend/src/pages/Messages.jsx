import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';

export default function Messages() {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    axios.get('/messages').then(({ data }) => {
      setMessages(data);
    });
  }, []);

  return (
    <section id="messages">
      <h1 className="text-center">Messaggi</h1>
      {messages === null ? (
        <p>Loading...</p>
      ) : (
        <div className="mess-form-cont">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={`message${m.id}`}>
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>{m.surname}</td>
                  <td>{m.email}</td>
                  <td>{m.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
