import axios from "axios";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  HR,
  Label,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import { TbPlus, TbSearch, TbX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";

const apiUrl = import.meta.env.VITE_API_URL;

const Tickets = () => {
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId");
  const [tickets, setTickets] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requesters, setRequesters] = useState([]);
  const [tags, setTags] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [ticketId, setTicketId] = useState(null);

  const [selectedRequester, setSelectedRequester] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("closed");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/tickets/?page=${currentPage}`,
        );
        setTickets(response.data.tickets);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setTotalRecords(response.data.totalItems);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchAllTickets();
  }, [currentPage, navigate]);

  const fetchTicket = async (id) => {
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

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/tags`);
      const data = await response.data;
      setTags(data);
    } catch (error) {
      console.error("Erro ao buscar as tags:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users`);
      const data = await response.data;
      setRequesters(data);
    } catch (error) {
      console.error("Erro ao buscar as usuários:", error);
    }
  };

  const fetchCompany = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/companies`);
      const data = await response.data;
      setCompanies(data);
    } catch (error) {
      console.error("Erro ao buscar as empresas:", error);
    }
  };

  const handleNewTicket = () => {
    fetchUsers();
    fetchTags();
    fetchCompany();
    setOpenModal(true);
  };
  const handleManageTicket = (id) => {
    setTicketId(id);
    fetchUsers();
    fetchTags();
    fetchCompany();
    fetchTicket(id);
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("Usuário não autenticado");
      return;
    }

    if (ticketId) {
      //logica para alteração
    } else {
      setOpenModal(false);
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
          navigate("/tickets");
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
      <div className="w-full">
        <Breadcrumb
          aria-label="Default breadcrumb example"
          className="justify-start"
        >
          <Breadcrumb.Item href="/" icon={HiHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Tickets</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Tickets</h2>
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
        <Button onClick={() => handleNewTicket()} size="xs" color="blue">
          <TbPlus className="mr-2 h-4 w-4" />
          Novo Ticket
        </Button>
      </div>
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          href="#"
          className="w-full"
          onClick={() => {
            handleManageTicket(ticket.id);
          }}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {ticket.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {ticket.description}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="inline text-sm text-gray-400">Status:</span>
              <span
                className={`inline text-sm font-medium ${
                  ticket.status == "closed"
                    ? "text-green-400"
                    : "in_progress"
                      ? "text-yellow-400"
                      : "text-blue-400"
                }`}
              >
                {ticket.status == "closed"
                  ? "fechado"
                  : "in_progress"
                    ? "em progresso"
                    : "aberto"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge color={"info"}>{ticket.Tags[0].name}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline text-sm dark:text-gray-400">
                Requerente:
              </span>
              <div>
                <span className="inline text-sm font-medium dark:text-gray-400">
                  {ticket.requester.name}
                </span>
                <span className="inline text-sm font-medium dark:text-gray-400">
                  /
                </span>
                <span className="inline text-sm font-medium dark:text-gray-400">
                  {ticket.Company.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline text-sm dark:text-gray-400">Data:</span>
              <span className="inline text-sm font-medium dark:text-gray-400">
                {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        </Card>
      ))}
      <div className="mt-6 flex overflow-x-auto sm:justify-center">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Exibindo{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentPage}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalPages}
            </span>{" "}
            paginas, totalizando{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalRecords}
            </span>{" "}
            registros
          </span>
          <div className="mt-3 flex rounded-[0.32rem] border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            <button
              className="flex h-8 items-center justify-center rounded-s bg-white px-3 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <button
              className="flex h-8 items-center justify-center rounded-e border-0 border-s border-gray-100 bg-white px-3 text-sm font-medium hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Proximo
            </button>
          </div>
        </div>
      </div>

      <Modal
        dismissible
        show={openModal}
        size={"lg"}
        onClose={() => setOpenModal(false)}
      >
        <span
          className="absolute right-0 m-4 rounded-md p-2 hover:cursor-pointer hover:bg-gray-500"
          onClick={() => setOpenModal(false)}
        >
          <TbX className="cursor-pointer dark:text-white" />
        </span>
        <Card className="w-full max-w-xl p-0">
          <h2 className="mt-[-6px] text-lg font-medium dark:text-white">
            {ticketId ? "Editar Ticket" : "Novo Ticket"}
          </h2>
          <HR className="my-0" />
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="title" value="Título" />
              </div>
              <TextInput
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                shadow
                sizing=""
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="description" value="Descrição" />
              </div>
              <Textarea
                id="description"
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sizing="sm"
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="user" value="Usuário" />
              </div>
              <Select
                id="user"
                value={selectedRequester}
                onChange={(e) => setSelectedRequester(e.target.value)}
                required
                sizing="sm"
              >
                {!ticketId && <option value="">Selecione uma usuário</option>}
                {requesters.map((requester) => (
                  <option key={requester.id} value={requester.id}>
                    {requester.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="company" value="Empresa" />
              </div>
              <Select
                id="company"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                required
                sizing="sm"
              >
                {!ticketId && <option value="">Selecione uma empresa</option>}
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="status" value="Status" />
              </div>
              <Select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                required
                sizing="sm"
              >
                <option value="open">Aberto</option>
                <option value="in_progress">Em andamento</option>
                <option value="closed">Fechado</option>
              </Select>
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="tag" value="Tag" />
              </div>
              <Select
                id="tag"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                required
                sizing="sm"
              >
                {!ticketId && <option value="">Selecione uma tag</option>}
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </Select>
            </div>
            <HR className="mb-2 mt-4" />
            <div className="mt-2 flex w-full items-center gap-4">
              <Button className="w-28" type="submit" size="xs" color="blue">
                {!ticketId ? "Criar Ticket" : "Alterar Ticket"}
              </Button>
            </div>
          </form>
        </Card>
      </Modal>
    </Container>
  );
};

export default Tickets;
