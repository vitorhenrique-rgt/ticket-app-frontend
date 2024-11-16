import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card } from "flowbite-react";
import Container from "../../components/container/Container";

const apiUrl = import.meta.env.VITE_API_URL;

const Tickets = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const [tickets, setTickets] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Se não houver um usuário logado, redireciona para a página de login
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTickets = async () => {
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
    fetchTickets();
  }, [currentPage]);

  const handleNewTicket = () => {
    navigate("/new-ticket");
  };
  const handleManageTicket = (id) => {
    navigate(`/edit-ticket/${id}`);
  };

  return (
    <Container>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">Últimos Tickets</h2>
        <Button onClick={handleNewTicket}>
          Adicionar Novo Ticket
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
              d="M9 5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2M3 11h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z"
            />
          </svg>
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
          <div className="flex rounded-[0.32rem] border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
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
    </Container>
  );
};

export default Tickets;
