import axios from "axios";
import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";

const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [ticketStats, setTicketStats] = useState([]); // Inicializa como array vazio
  const [tagStats, setTagStats] = useState([]); // Inicializa como array vazio
  const [filter, setFilter] = useState("day"); // Opções: day, week, month
  const navigate = useNavigate();

  // Referências para os gráficos
  const ticketChartRef = useRef(null);
  const tagChartRef = useRef(null);
  const ticketChartInstance = useRef(null);
  const tagChartInstance = useRef(null);

  useEffect(() => {
    const fetchTicketStats = async () => {
      let startDate, endDate;
      const today = new Date();

      switch (filter) {
        case "day":
          startDate = new Date().toISOString().split("T")[0];
          endDate = new Date().toISOString().split("T")[0];
          break;
        case "week":
          startDate = new Date(today.setDate(today.getDate() - 7))
            .toISOString()
            .split("T")[0];
          endDate = new Date().toISOString().split("T")[0];
          break;
        case "month":
          startDate = new Date(today.setMonth(today.getMonth() - 1))
            .toISOString()
            .split("T")[0];
          endDate = new Date().toISOString().split("T")[0];
          break;
        default:
          return;
      }

      try {
        const response = await axios.get(
          `${apiUrl}/api/tickets/?startDate=${startDate}&endDate=${endDate}&limit=30000`,
        );
        const data = response.data.tickets;
        if (filter === "day") {
          // Processar tickets por hora
          const hours = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
          const ticketsByHour = hours.map((hour) => {
            return data.filter(
              (ticket) => new Date(ticket.createdAt).getHours() === hour,
            ).length;
          });
          setTicketStats(ticketsByHour);
        } else {
          // Processar tickets por dia
          const dates = {};
          data.forEach((ticket) => {
            const date = new Date(ticket.createdAt).toISOString().split("T")[0];
            dates[date] = (dates[date] || 0) + 1;
          });

          const sortedDates = Object.keys(dates).sort();
          const ticketsByDay = sortedDates.map((date) => ({
            date,
            count: dates[date],
          }));
          setTicketStats(ticketsByDay);
        }
        // Processar tags
        const tagCount = data.reduce((acc, ticket) => {
          ticket.Tags.forEach((tag) => {
            acc[tag.name] = (acc[tag.name] || 0) + 1;
          });
          return acc;
        }, {});

        setTagStats(Object.entries(tagCount).sort((a, b) => b[1] - a[1]));
      } catch (error) {
        console.error("Erro ao buscar estatísticas de tickets:", error);
      }
    };

    fetchTicketStats();
  }, [filter]);

  useEffect(() => {
    // Função para destruir gráficos existentes
    const destroyTicketCharts = () => {
      if (ticketChartInstance.current) {
        ticketChartInstance.current.destroy();
        ticketChartInstance.current = null;
      }
    };
    const destroyTagCharts = () => {
      if (tagChartInstance.current) {
        tagChartInstance.current.destroy();
        tagChartInstance.current = null;
      }
    };

    // Criar ou atualizar gráfico de tickets
    const createTicketChart = () => {
      const ctx1 = ticketChartRef.current.getContext("2d");
      destroyTicketCharts(); // Destroi o gráfico anterior

      if (filter === "day") {
        ticketChartInstance.current = new Chart(ctx1, {
          type: "bar", // Mudança para gráfico de barras
          data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [
              {
                label: "Tickets por Hora",
                data: ticketStats,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
              },
            ],
          },
          options: { responsive: true },
        });
      } else {
        const labels = ticketStats.map((item) => item.date);
        const dataPoints = ticketStats.map((item) => item.count);

        ticketChartInstance.current = new Chart(ctx1, {
          type: "bar", // Mudança para gráfico de barras
          data: {
            labels,
            datasets: [
              {
                label: "Tickets por Dia",
                data: dataPoints,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: { responsive: true },
        });
      }
    };

    // Criar ou atualizar gráfico de tags
    const createTagChart = () => {
      const ctx2 = tagChartRef.current.getContext("2d");
      destroyTagCharts(); // Destroi o gráfico anterior

      const labels = tagStats.map((item) => item[0]);
      const dataPoints = tagStats.map((item) => item[1]);

      tagChartInstance.current = new Chart(ctx2, {
        type: "bar", // Mudança para gráfico de barras
        data: {
          labels,
          datasets: [
            {
              label: "Tags Mais Usadas",
              data: dataPoints,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
            },
          ],
        },
        options: { responsive: true },
      });
    };

    createTicketChart();
    createTagChart();

    return () => {
      destroyTicketCharts();
      destroyTagCharts(); // Destroi gráficos ao desmontar
    };
  }, [ticketStats, tagStats, filter]);

  return (
    <Container>
      <div className="m-auto mt-4 w-full max-w-4xl rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl text-white">Dashboard</h2>
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setFilter("day")}
            className={`btn ${filter === "day" ? "bg-indigo-500" : "bg-gray-700"}`}
          >
            Dia
          </button>
          <button
            onClick={() => setFilter("week")}
            className={`btn ${filter === "week" ? "bg-indigo-500" : "bg-gray-700"}`}
          >
            Semana
          </button>
          <button
            onClick={() => setFilter("month")}
            className={`btn ${filter === "month" ? "bg-indigo-500" : "bg-gray-700"}`}
          >
            Mês
          </button>
        </div>
        <div className="mb-8">
          <h3 className="mb-4 text-lg text-white">Quantidade de Chamados</h3>
          <canvas ref={ticketChartRef} id="ticketChart"></canvas>
        </div>
        <div className="mb-8">
          <h3 className="mb-4 text-lg text-white">Tags Mais Usadas</h3>
          <canvas ref={tagChartRef} id="tagChart"></canvas>
        </div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/admin/users")}
            className="btn bg-green-500"
          >
            Usuários
          </button>
          <button
            onClick={() => navigate("/admin/companies")}
            className="btn bg-blue-500"
          >
            Empresas
          </button>
          <button
            onClick={() => navigate("/admin/tags")}
            className="btn bg-purple-500"
          >
            Tags
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
