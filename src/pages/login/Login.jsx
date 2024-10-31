import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl  = import.meta.env.VITE_API_URL

const Login = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log(apiUrl)
    // Verifica se o usuário já está logado
    useEffect(() => {
      const userId = sessionStorage.getItem('userId'); // Ou localStorage se preferir
      if (userId) {
        // Se o usuário já está logado, redireciona para a página de tickets
        navigate('/tickets');
      }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Chamada à API para autenticar o usuário
      const response = await axios.post(`${apiUrl}/api/login`, { nickname, password });
      
      // Se a autenticação for bem-sucedida, armazena o ID e o nickname
      if (response.status === 200) {
        const { id, nickname, admin  } = response.data.user; // Captura userId e nickname
        // Aqui, você pode armazenar o userId e o nickname em um contexto, localStorage ou onde preferir
        sessionStorage.setItem('userId', id); // Armazena userId no localStorage
        sessionStorage.setItem('nickname', nickname); // Armazena nickname no localStorage
        sessionStorage.setItem('admin', admin);
        navigate('/tickets');
      }
    } catch (error) {
      setError('Nickname ou senha inválidos.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl text-white mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="nickname">
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 transition duration-200"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
