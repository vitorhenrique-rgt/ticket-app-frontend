import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const apiUrl  = import.meta.env.VITE_API_URL

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await axios.delete(`${apiUrl}/api/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };

  const handleAddNew = () => {
    navigate('/admin/users/new');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 gap-2">
      <Header />
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl text-white mb-6 text-center">Gerenciar Usuários</h2>
        <button
          onClick={handleAddNew}
          className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 transition duration-200"
        >
          Adicionar Novo Usuário
        </button>
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="mr-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500 transition duration-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500 transition duration-200"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
