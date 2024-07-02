import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';
import { FaTrashCan } from 'react-icons/fa6';

export default function Messages() {
  const [messages, setMessages] = useState(null);
  const [deleteComplete, setDeleteComplete] = useState(false);

  useEffect(() => {
    axios.get('/messages').then(({ data }) => {
      setMessages(data);
    });
  }, []);

  const deleteMessage = async (id) => {
    await axios.delete(`/messages/${id}`);
    setDeleteComplete(true);
    axios.get('/messages').then(({ data }) => {
      setMessages(data);
    });
  };

  return (
    <section id="messages">
      <h1 className="text-center">Messaggi</h1>
      {messages === null ? (
        <p>Loading...</p>
      ) : (
        <div className="mess-form-cont text-center">
          {messages.length > 0 ? (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Content</th>
                  <th>Delete</th>
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
                    <td>
                      <button
                        onClick={() => deleteMessage(m.id)} // Modifica qui
                        className="btn btn-danger delete"
                      >
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span>Non è presente alcun messaggio</span>
          )}
          {deleteComplete && (
            <p className="bg-danger delete-message">
              Messaggio Cancellato con successo!
            </p>
          )}
        </div>
      )}
    </section>
  );
}
