import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const EditTag = () => {
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tags/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error("Erro ao buscar tag:", error);
      }
    };

    fetchTag();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${apiUrl}/api/tags/${id}`, { name });
      alert("Tag atualizada com sucesso!");
      navigate("/admin/tags");
    } catch (error) {
      console.error("Erro ao atualizar tag:", error);
      alert("Erro ao atualizar tag. Por favor, tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl text-white">Editar Tag</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-white"
              htmlFor="name"
            >
              Nome da Tag
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-md border-none bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-3 text-white transition duration-200 hover:bg-indigo-500"
          >
            Atualizar Tag
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTag;
