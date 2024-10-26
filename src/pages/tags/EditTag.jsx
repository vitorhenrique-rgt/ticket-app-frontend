import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl  = import.meta.env.VITE_API_URL

const EditTag = () => {
  const [name, setName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tags/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error('Erro ao buscar tag:', error);
      }
    };

    fetchTag();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${apiUrl}/api/tags/${id}`, { name });
      alert('Tag atualizada com sucesso!');
      navigate('/tags');
    } catch (error) {
      console.error('Erro ao atualizar tag:', error);
      alert('Erro ao atualizar tag. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl text-white mb-6 text-center">Editar Tag</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2" htmlFor="name">
              Nome da Tag
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
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 transition duration-200"
          >
            Atualizar Tag
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTag;
