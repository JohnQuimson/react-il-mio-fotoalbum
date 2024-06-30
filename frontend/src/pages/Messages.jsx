import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';

export default function () {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    axios.get('/messages').then(({ data }) => {
      setMessages(data);
    });
  });

  return (
    <>
      <section id="messages">
        {messages === null ? (
          <p>Loading...</p>
        ) : (
          <ul className="row m-0 p-0">
            {messages.map((m) => (
              <li
                key={`foto${m.id}`}
                className="col-12 col-sm-6 col-md-4 col-xl-3 g-4"
              >
                {m.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
