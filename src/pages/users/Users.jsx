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
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import { TbEdit, TbPlus, TbSearch, TbX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import CustomToast from "../../components/CustomToast";

const apiUrl = import.meta.env.VITE_API_URL;

const UserList = () => {
  const navigate = useNavigate();

  const currentUserId = sessionStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  let [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (!currentUserId) {
      navigate("/login");
    }
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const clearModalFields = () => {
    setId(null);
    setName("");
    setNickname("");
    setIsAdmin(false);
    setSelectedCompany("");
    setPassword("");
    setOpenModal(false);
  };

  useEffect(() => {
    fetchAllUsers();
  }, [navigate]);

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
  });

  // TODO:criar filtro/busca de usuários
  //TODO: criar paginação de usuários(verificar backend antes)
  //FIXME: verificar validação de senha ao atualizar usuário

  const fetchUser = async (id) => {
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

  const handleNewUser = () => {
    setOpenModal(true);
  };
  const handleEditUser = (id) => {
    fetchUser(id);
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    showToast("loading", "Processando...");
    if (id) {
      try {
        const response = await axios.put(
          `http://localhost:3001/api/users/${id}`,
          {
            name,
            nickname,
            isAdmin,
            companyId: selectedCompany,
            ...(password && { password }),
          },
        );

        if (response.status === 201) {
          showToast("success", "Usuário atualizado com sucesso!");
          await fetchAllUsers();
          clearModalFields();
        } else {
          console.log("Erro ao atualizar usuário", response.data);
        }
      } catch (error) {
        showToast("error", "Erro ao atualizar usuário");
        console.error("Erro ao atualizar usuário:", error);
      }
    } else {
      password === "" ? (password = "123") : password;
      try {
        const response = await axios.post(`${apiUrl}/api/users`, {
          name,
          nickname,
          password,
          isAdmin,
          companyId: selectedCompany,
        });

        if (response.status === 201) {
          showToast("success", "Usuário criado com sucesso!");
          await fetchAllUsers();
          clearModalFields();
        } else {
          console.log("Erro ao criar o usuário", response.data);
        }
      } catch (error) {
        showToast("error", "Erro ao criar usuário");
        console.error("Erro ao criar usuário:", error);
      }
    }
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  };

  //TODO:logica para desativar usuário

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
            placeholder="Buscar usuários"
            required
          />
        </div>
        <Button onClick={() => handleNewUser()} size="xs" color="blue">
          <TbPlus className="my-auto mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="px-3 py-2">#</Table.HeadCell>
              <Table.HeadCell className="px-3 py-2">Nome</Table.HeadCell>
              <Table.HeadCell className="px-3 py-2">Empresa</Table.HeadCell>
              <Table.HeadCell className="px-3 py-2">Status</Table.HeadCell>
              <Table.HeadCell className="px-3 py-2 text-center">
                Ações
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((user, index) => (
                <Table.Row
                  key={user.id}
                  className="bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap px-3 py-2 font-medium text-gray-900 dark:text-white">
                    {`${index + 1}`}
                  </Table.Cell>
                  <Table.Cell className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <Avatar alt="User" rounded />
                      {user.name}
                    </div>
                  </Table.Cell>
                  {companies
                    .filter((company) => company.id === user.companyId)
                    .map((company) => (
                      <Table.Cell className="px-3 py-2" key={company.id}>
                        {company.name}
                      </Table.Cell>
                    ))}
                  <Table.Cell className="px-3 py-2">
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
                  <Table.Cell className="px-3 py-2">
                    <Button
                      className="m-auto flex"
                      onClick={() => {
                        handleEditUser(user.id), setId(user.id);
                      }}
                      size="xs"
                      color="blue"
                    >
                      <TbEdit className="my-auto mr-2 h-4 w-4" />
                      Editar Usuário
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
      <Modal
        dismissible
        show={openModal}
        size={"lg"}
        onClose={clearModalFields}
      >
        <span className="absolute right-0 p-4" onClick={clearModalFields}>
          <TbX className="cursor-pointer dark:text-white" />
        </span>
        <Card className="w-full max-w-xl p-0">
          <h2 className="mt-[-6px] text-lg font-medium dark:text-white">
            {id ? "Editar Usuário" : "Novo Usuário"}
          </h2>
          <HR className="my-0" />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="name" value="Nome" />
              </div>
              <TextInput
                sizing="sm"
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="nickname" value="Apelido" />
              </div>
              <TextInput
                sizing="sm"
                id="nickname"
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="companies" value="Empresa" />
              </div>
              <Select
                sizing="sm"
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
              <div className="mb-1 block">
                <Label htmlFor="password" value="Senha" />
              </div>
              <TextInput
                sizing="sm"
                id="password"
                type="password"
                {...(!id && isAdmin && { required: true })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="repeat-password" value="Repita  a senha" />
              </div>
              <TextInput
                sizing="sm"
                id="repeat-password"
                type="password"
                {...(!id && isAdmin && { required: true })}
                defaultValue={password}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                className="cursor-pointer"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <Label className="cursor-pointer" htmlFor="isAdmin">
                Administrador
              </Label>
            </div>
            <HR className="my-0" />
            <div className="mt-2 flex w-full items-center gap-4">
              <Button className="w-28" type="submit" size="xs" color="blue">
                Salvar
              </Button>
            </div>
          </form>
        </Card>
      </Modal>
      {toast.show && (
        <CustomToast
          type={toast.type}
          message={toast.message}
          onDismiss={() => setToast({ show: false, type: "", message: "" })}
        />
      )}
    </Container>
  );
};

export default UserList;
