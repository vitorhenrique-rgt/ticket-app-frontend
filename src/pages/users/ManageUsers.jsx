import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import {
  Button,
  Card,
  Checkbox,
  Label,
  Select,
  TextInput,
} from "flowbite-react";

const apiUrl = import.meta.env.VITE_API_URL;

const ManageUsers = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  let [password, setPassword] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const { id } = useParams();
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

  if (id) {
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/users/${id}`);
          const { name, nickname, isAdmin, companyId, isActive } =
            response.data;
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
    }, [id]);
  }

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

  return (
    <Container>
      <Card className="w-full max-w-xl">
        <h2 className="mb-6 text-center text-2xl dark:text-white">
          {id ? "Alterar Usuário" : "Criar Usuário"}
        </h2>
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
                navigate(-1);
              }}
            >
              <svg
                className="mr-4 h-6 w-6 text-white"
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
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Cancelar
            </Button>
            <Button className="w-full" type="submit" color="success">
              Salvar
              <svg
                className="ml-4 h-6 w-6 text-white"
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
                  d="M10 3v4a1 1 0 0 1-1 1H5m4 6 2 2 4-4m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                />
              </svg>
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default ManageUsers;
