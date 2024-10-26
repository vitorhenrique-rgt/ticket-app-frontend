import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const apiUrl = import.meta.env.VITE_API_URL

const Tickets = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  useEffect(() => {
    if (!userId) {
      navigate('/login'); // Se não houver um usuário logado, redireciona para a página de login
    }
  }, [navigate]);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tickets/?adminId=${userId}`); // Altere para a URL correta
        setTickets(response.data.tickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleNewTicket = () => {
    navigate('/new-ticket');
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <Header/>
      <h2 className="text-2xl font-bold text-white">Últimos Tickets</h2>
      <button onClick={handleNewTicket} className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">
        Adicionar Novo Ticket
      </button>
      <ul className="mt-6 space-y-4">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="p-4 bg-gray-700 rounded-md">
            <h3 className="text-lg font-bold text-white">{ticket.title}</h3>
            <p className="text-gray-300">{ticket.description}</p>
            <span className="text-sm text-gray-400">Status: {ticket.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tickets;
