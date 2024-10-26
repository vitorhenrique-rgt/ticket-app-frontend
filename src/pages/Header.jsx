import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Bom dia');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  // Obtém o nome do usuário armazenado no sessionStorage
  const nickname = sessionStorage.getItem('nickname');

  // Função de logout
  const handleLogout = () => {
    // Limpa os dados do localStorage
    sessionStorage.removeItem('nickname');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('admin');
    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center w-full">
      {/* Saudação com o nome do usuário */}
      <div>
        <h1>{greeting}, {nickname}</h1>
      </div>
      {/* Botão de logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
