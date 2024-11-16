import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateUser = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  let [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const navigate = useNavigate();

  // Função para buscar as companies do banco
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <Container>
      <Card className="w-full max-w-xl">
        <h2 className="mb-6 text-center text-2xl dark:text-white">
          Criar Novo Usuário
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
              required
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">Selecione uma empresa</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repita  a senha" />
            </div>
            <TextInput id="repeat-password" type="password" required />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <Label htmlFor="isAdmin">Administrador</Label>
          </div>
          <Button type="submit">Criar Usuário</Button>
        </form>
      </Card>
    </Container>
  );
};

export default CreateUser;
