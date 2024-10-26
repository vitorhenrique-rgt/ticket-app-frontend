import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'

const apiUrl  = import.meta.env.VITE_API_URL

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requesters, setRequesters] = useState([]);
  const [SelectedRequester, setSelectedRequester] = useState('');
  const [status, setStatus] = useState('open');
  const [tags, setTags] = useState([]); 
  const [selectedTag, setSelectedTag] = useState('');
  const [companies, setCompanies] = useState([]); 
  const [selectedCompany, setSelectedCompany] = useState('');
  const navigate = useNavigate();

  // Função para buscar as tags do banco
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tags`);
        const data = await response.data;
        setTags(data); // Salva as tags no estado
      } catch (error) {
        console.error('Erro ao buscar as tags:', error);
      }
    };

    fetchTags();
  }, []);

  // Função para buscar os users do banco
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`);
        const data = await response.data;
        setRequesters(data);
      } catch (error) {
        console.error('Erro ao buscar as usuários:', error);
      }
    };

    fetchUsers();
  }, []);
  // Função para buscar as companies do banco
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/companies`);
        const data = await response.data;
        setCompanies(data);
      } catch (error) {
        console.error('Erro ao buscar as empresas:', error);
      }
    };

    fetchCompany();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userId = sessionStorage.getItem('userId'); // Pegar o id do usuário logado
    if (!userId) {
      alert('Usuário não autenticado');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/tickets`, {
          title,
          description,
          status,
          tagId: selectedTag, 
          requesterId: SelectedRequester,
          adminId:userId,
          companyId:selectedCompany
      });

      if (response.status === 201) {
        navigate('/tickets'); // Redireciona para a listagem de tickets
      } else {
        
        console.log('Erro ao criar o ticket', response.data);
      }
    } catch (error) {
      console.error('Erro na requisição:', error.response ? error.response.data : error.message);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-2 bg-gray-900">
      <Header/>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl text-white mb-6 text-center">Novo Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="description">
              Descrição
            </label>
            <textarea
              id="description"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="user">
              Usuário
            </label>
            <select
              id="user"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSelectedRequester(e.target.value)}
            >
              <option value="">Selecione uma usuário</option>
              {requesters.map((requester)=>(
                  <option key={requester.id} value={requester.id}>{requester.name}</option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="company">
              Empresa
            </label>
            <select
              id="company"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">Selecione uma empresa</option>
              {companies.map((company)=>(
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">Aberto</option>
              <option value="in_progress">Em andamento</option>
              <option value="closed">Fechado</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="tag">
              Tag
            </label>
            <select
              id="tag"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSelectedTag(e.target.value)} // Captura o valor da tag selecionada
            >
              <option value="">Selecione uma tag</option> {/* Uma opção padrão */}
              {tags.map((tag) => (  // Usa map para renderizar cada tag do array
                <option key={tag.id} value={tag.id}>{tag.name}</option> // O ID da tag é o valor, e o nome é o texto visível
              ))}
            </select>
          </div>


          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 transition duration-200"
          >
            Criar Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTicket;
