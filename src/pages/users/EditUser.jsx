import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl  = import.meta.env.VITE_API_URL

const EditUser = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [password, setPassword] = useState('');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/${id}`);
        const { name, nickname, isAdmin, companyId } = response.data;
        setName(name);
        setNickname(nickname);
        setIsAdmin(isAdmin);
        setSelectedCompany(companyId);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUser();
  }, [id]);

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
    console.log(companies)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/api/users/${id}`, {
        name,
        nickname,
        isAdmin,
        password,
        companyId : selectedCompany,
      });

      alert('Usuário atualizado com sucesso!');
      navigate('/admin'); // Redireciona para a área administrativa
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl text-white mb-6 text-center">Editar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="nickName">
            Apelido
            </label>
            <input
              type="text"
              id="nickName"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
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
              { companies.filter(company => (company.id == selectedCompany)).map(company =>(
              <option key={company.id} value={company.id}>{company.name}</option>
              ))}
              {companies.filter(company => (company.id !== selectedCompany)).map(company=>(
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="password">
              Alterar senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex gap-2">
            <label className="block text-white text-sm font-medium" htmlFor="isAdmin">
              Administrador
            </label>
            <input type="checkbox" id='isAdmin'checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 transition duration-200"
          >
            Atualizar Usuário
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
