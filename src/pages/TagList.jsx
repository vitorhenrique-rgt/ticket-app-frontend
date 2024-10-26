import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const apiUrl  = import.meta.env.VITE_API_URL

const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tags`);
        setTags(response.data);
      } catch (error) {
        console.error('Erro ao buscar tags:', error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl text-white mb-6 text-center">Tags</h2>
        <table className="min-w-full bg-gray-700 text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id}>
                <td className="py-2 px-4 border-b text-center">{tag.id}</td>
                <td className="py-2 px-4 border-b text-center">{tag.name}</td>
                <td className="py-2 px-4 border-b text-center">
                  <Link to={`/tags/edit/${tag.id}`} className="text-indigo-500 hover:underline">Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="admin/tags/new" className="block mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-500">
          Nova Tag
        </Link>
      </div>
    </div>
  );
};

export default TagList;
