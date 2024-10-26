import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const apiUrl  = import.meta.env.VITE_API_URL

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/companies`);
        setCompanies(response.data);
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/companies/${id}`);
      setCompanies(companies.filter(company => company.id !== id));
      alert('Empresa deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar empresa:', error);
      alert('Erro ao deletar empresa. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <h2 className="text-3xl text-white mb-6">Empresas</h2>
      <Link to="/admin/companies/new" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 mb-4 inline-block">
        Nova Empresa
      </Link>
      <table className="min-w-full bg-gray-800 text-white mt-4">
        <thead>
          <tr>
            <th className="py-2">Nome</th>
            <th className="py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td className="py-2">{company.name}</td>
              <td className="py-2">
                <Link to={`/admin/companies/edit/${company.id}`} className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-400 mr-2">
                  Editar
                </Link>
                <button onClick={() => handleDelete(company.id)} className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
