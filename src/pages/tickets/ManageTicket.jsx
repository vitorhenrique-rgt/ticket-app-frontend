import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import {
  Button,
  Card,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";

const apiUrl = import.meta.env.VITE_API_URL;

const ManageTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requesters, setRequesters] = useState([]);
  const [selectedRequester, setSelectedRequester] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("open");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [ticket, setTicket] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Função para buscar as tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tags`);
        const data = await response.data;
        setTags(data); // Salva as tags no estado
      } catch (error) {
        console.error("Erro ao buscar as tags:", error);
      }
    };
    fetchTags();
  }, []);

  // Função para buscar os users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`);
        const data = await response.data;
        setRequesters(data);
      } catch (error) {
        console.error("Erro ao buscar as usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  // Função para buscar as companies
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
    if (id) {
      const fetchTicket = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/tickets/${id}`);
          const data = await response.data;
          setTitle(data.title);
          setDescription(data.description);
          setSelectedTag(data.Tags[0].id);
          setSelectedRequester(data.requesterId);
          setSelectedStatus(data.status);
          setSelectedCompany(data.companyId);
        } catch (error) {
          console.error("Erro ao buscar o ticket:", error);
        }
      };
      fetchTicket();
    }
  }, [id]); // `useEffect` será executado apenas quando `id` mudar

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("Usuário não autenticado");
      return;
    }

    if (id) {
      //logica para alteração
    } else {
      try {
        const response = await axios.post(`${apiUrl}/api/tickets`, {
          title,
          description,
          status: selectedStatus,
          tagId: selectedTag,
          requesterId: selectedRequester,
          adminId: userId,
          companyId: selectedCompany,
        });

        if (response.status === 201) {
          navigate("/tickets"); // Redireciona para a listagem de tickets
        } else {
          console.log("Erro ao criar o ticket", response.data);
        }
      } catch (error) {
        console.error(
          "Erro na requisição:",
          error.response ? error.response.data : error.message,
        );
      }
    }
  };

  return (
    <Container>
      <Card className="w-full max-w-xl">
        <h2 className="mb-6 text-center text-2xl dark:text-white">
          {id ? "Editar Ticket" : "Novo Ticket"}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Título" />
            </div>
            <TextInput
              id="title"
              type="email"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Descrição" />
            </div>
            <Textarea
              id="description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="user" value="Usuário" />
            </div>
            <Select
              id="user"
              value={selectedRequester}
              onChange={(e) => setSelectedRequester(e.target.value)}
              required
            >
              {!id && <option value="">Selecione uma usuário</option>}
              {requesters.map((requester) => (
                <option key={requester.id} value={requester.id}>
                  {requester.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="company" value="Empresa" />
            </div>
            <Select
              id="company"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              required
            >
              {!id && <option value="">Selecione uma empresa</option>}
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="status" value="Status" />
            </div>
            <Select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              <option value="open">Aberto</option>
              <option value="in_progress">Em andamento</option>
              <option value="closed">Fechado</option>
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="tag" value="Tag" />
            </div>
            <Select
              id="tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              required
            >
              {!id && <option value="">Selecione uma tag</option>}
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </Select>
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
                width="18"
                height="18"
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
              Criar Ticket
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

export default ManageTicket;
