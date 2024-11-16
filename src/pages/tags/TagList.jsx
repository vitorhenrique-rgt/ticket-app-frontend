import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const TagList = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tags`);
        setTags(response.data);
      } catch (error) {
        console.error("Erro ao buscar tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <div className="w-full max-w-4xl rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl text-white">Tags</h2>
        <table className="min-w-full bg-gray-700 text-white">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Nome</th>
              <th className="border-b px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id}>
                <td className="border-b px-4 py-2 text-center">{tag.id}</td>
                <td className="border-b px-4 py-2 text-center">{tag.name}</td>
                <td className="border-b px-4 py-2 text-center">
                  <Link
                    to={`/admin/tags/edit/${tag.id}`}
                    className="text-indigo-500 hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="mt-4 block rounded-md bg-indigo-600 px-4 py-2 text-center text-white hover:bg-indigo-500"
          onClick={() => {
            navigate("/admin/tags/new");
          }}
        >
          Nova Tag
        </button>
      </div>
    </div>
  );
};

export default TagList;
