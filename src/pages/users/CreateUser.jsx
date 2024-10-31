import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl  = import.meta.env.VITE_API_URL

const CreateUser = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  let [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [companies, setCompanies] = useState([]); 
  const [selectedCompany, setSelectedCompany] = useState('');
  const navigate = useNavigate();

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
    password === '' ? password='123' :  password;
    console.log(name)
    console.log(nickname)
    console.log(password)
    console.log(isAdmin)
    console.log(selectedCompany)

    try {
      await axios.post(`${apiUrl}/api/users`, {
        name,
        nickname,
        password,
        isAdmin,
        companyId:selectedCompany
      });

      alert('Usuário criado com sucesso!');
      navigate('/admin/users'); // Redireciona para a área administrativa
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl text-white mb-6 text-center">Criar Novo Usuário</h2>
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
              <option value="">Selecione uma empresa</option>
              {companies.map((company)=>(
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="password">
              Senha
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
            Criar Usuário
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
