import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import { Button, Table } from "flowbite-react";
import { TbEdit, TbTag } from "react-icons/tb";

const apiUrl = import.meta.env.VITE_API_URL;

const TagList = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tags`);
        setTags(response.data);
      } catch (error) {
        console.error("Erro ao buscar tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <Container>
      <div className="flex w-full items-center justify-between">
        <h2 className="mb-6 text-center text-2xl dark:text-white">
          Gerenciar Tags
        </h2>
        <Button
          onClick={() => {
            navigate("/admin/tags/new");
          }}
        >
          Adicionar Novo Tag
          <TbTag className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Editar</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {tags.map((tag, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={tag.id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {tag.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <a
                    href="#"
                    onClick={() => {
                      navigate(`/admin/tags/edit/${tag.id}`);
                    }}
                    className="flex items-center font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Editar
                    <TbEdit className="ml-2 h-4 w-4" />
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

export default TagList;
