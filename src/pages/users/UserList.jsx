import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import { Button, Table } from "flowbite-react";

const apiUrl = import.meta.env.VITE_API_URL;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/companies`);
        const data = await response.data;
        setCompanies(data);
      } catch (error) {
        console.error("Erro ao buscar as empresas:", error);
      }
    };

    fetchCompany();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  // const handleDelete = async (id) => {
  //   if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
  //     try {
  //       await axios.delete(`${apiUrl}/api/users/${id}`);
  //       setUsers(users.filter((user) => user.id !== id));
  //       console.log(users);
  //     } catch (error) {
  //       console.error("Erro ao excluir o usuário:", error);
  //     }
  //   }
  // };

  const handleEdit = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };

  const handleAddNew = () => {
    navigate("/admin/users/new");
  };

  return (
    <Container>
      <div className="flex w-full items-center justify-between">
        <h2 className="mb-6 text-center text-2xl dark:text-white">
          Gerenciar Usuários
        </h2>
        <Button onClick={handleAddNew}>
          Adicionar Novo Usuário
          <svg
            className="ml-2 h-6 w-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>Empresa</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Editar</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((user, index) => (
              <Table.Row
                key={user.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {`${index + 1}`}
                </Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                {companies
                  .filter((company) => company.id === user.companyId)
                  .map((company) => (
                    <Table.Cell key={company.id}>{company.name}</Table.Cell>
                  ))}
                <Table.Cell
                  className={user.isActive ? "text-green-400" : "text-red-400"}
                >
                  {user.isActive ? "Ativo" : "Desativado"}
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => handleEdit(user.id)}
                  >
                    Editar
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Container>
  );
};

export default UserList;
