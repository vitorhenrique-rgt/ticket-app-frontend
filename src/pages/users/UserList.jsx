import axios from "axios";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  HR,
  Label,
  Modal,
  Select,
  Table,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import { TbCheck, TbEdit, TbPlus, TbSearch, TbX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";

const apiUrl = import.meta.env.VITE_API_URL;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  let [password, setPassword] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const id = null;

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

  if (id) {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/${id}`);
        const { name, nickname, isAdmin, companyId } = response.data;
        setName(name);
        setNickname(nickname);
        setIsAdmin(isAdmin);
        setPassword(password);
        setSelectedCompany(companyId);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
    fetchUser();
  }

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleNewUser = () => {
    setOpenModal(true);
  };
  const handleEditUser = () => {
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        await axios.put(`http://localhost:3001/api/users/${id}`, {
          name,
          nickname,
          isAdmin,
          companyId: selectedCompany,
          ...(password && { password }),
        });

        alert("Usuário atualizado com sucesso!");
        navigate("/admin"); // Redireciona para a área administrativa
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        alert("Erro ao atualizar usuário. Por favor, tente novamente.");
      }
    } else {
      password === "" ? (password = "123") : password;
      try {
        await axios.post(`${apiUrl}/api/users`, {
          name,
          nickname,
          password,
          isAdmin,
          companyId: selectedCompany,
        });

        alert("Usuário criado com sucesso!");
        navigate("/admin/users"); // Redireciona para a área administrativa
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        alert("Erro ao criar usuário. Por favor, tente novamente.");
      }
    }
  };

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

  return (
    <Container>
      <div className="w-full">
        <Breadcrumb
          aria-label="Default breadcrumb example"
          className="justify-start"
        >
          <Breadcrumb.Item href="/" icon={HiHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Usuários</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Usuários</h2>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="max-w-md">
          <TextInput
            sizing="sm"
            id="search"
            type="search"
            rightIcon={TbSearch}
            placeholder="Buscar ticket"
            required
          />
        </div>
        <Button onClick={() => handleNewUser()} size="xs" color="blue">
          <TbPlus className="mr-2 h-4 w-4" />
          Novo Usuário
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
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      alt="User"
                      img="https://avatar.iran.liara.run/public"
                      rounded
                    />
                    {user.name}
                  </div>
                </Table.Cell>
                {companies
                  .filter((company) => company.id === user.companyId)
                  .map((company) => (
                    <Table.Cell key={company.id}>{company.name}</Table.Cell>
                  ))}
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <div
                      className={
                        user.isActive
                          ? "h-2 w-2 rounded-full bg-green-400"
                          : "h-2 w-2 rounded-full bg-red-400"
                      }
                    ></div>
                    {user.isActive ? "Ativo" : "Desativado"}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => handleEditUser()}
                    size="xs"
                    color="blue"
                  >
                    <TbEdit className="mr-2 h-4 w-4" />
                    Editar Usuário
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <Modal
        dismissible
        show={openModal}
        size={"lg"}
        onClose={() => setOpenModal(false)}
      >
        <span
          className="absolute right-0 p-4"
          onClick={() => setOpenModal(false)}
        >
          <TbX className="cursor-pointer dark:text-white" />
        </span>
        <Card className="w-full max-w-xl p-0">
          <h2 className="mt-[-6px] text-lg font-medium dark:text-white">
            {id ? "Editar Ticket" : "Novo Ticket"}
          </h2>
          <HR className="my-0" />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nome" />
              </div>
              <TextInput
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nickname" value="Apelido" />
              </div>
              <TextInput
                id="nickname"
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="companies" value="Empresa" />
              </div>
              <Select
                id="companies"
                value={selectedCompany || ""}
                required
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                {!selectedCompany && (
                  <option value="">Selecione a Empresa</option>
                )}

                {selectedCompany &&
                  companies
                    .filter((company) => company.id === selectedCompany)
                    .map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}

                {companies
                  .filter((companies) => companies.id !== selectedCompany)
                  .map((companies) => (
                    <option key={companies.id} value={companies.id}>
                      {companies.name}
                    </option>
                  ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Senha" />
              </div>
              <TextInput
                id="password"
                type="password"
                {...(!id && { required: true })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeat-password" value="Repita  a senha" />
              </div>
              <TextInput
                id="repeat-password"
                type="password"
                {...(!id && { required: true })}
                defaultValue={password}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <Label htmlFor="isAdmin">Administrador</Label>
            </div>
            <div className="mt-2 flex w-full items-center gap-4">
              <Button
                className="w-full"
                type="button"
                color="failure"
                onClick={() => {
                  navigate("/admin/users");
                }}
              >
                <TbX className="mr-2 h-5 w-5" />
                Cancelar
              </Button>
              <Button className="w-full" type="submit" color="success">
                Salvar
                <TbCheck className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Card>
      </Modal>
    </Container>
  );
};

export default UserList;
