import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import { Card, Button, Label, TextInput } from "flowbite-react";
import { TbCheck, TbX } from "react-icons/tb";

const apiUrl = import.meta.env.VITE_API_URL;

const ManagerTag = () => {
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  if (id) {
    const fetchTag = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tags/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error("Erro ao buscar tag:", error);
      }
    };
    fetchTag();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      try {
        await axios.put(`${apiUrl}/api/tags/${id}`, { name });
        alert("Tag atualizada com sucesso!");
        navigate("/admin/tags");
      } catch (error) {
        console.error("Erro ao atualizar tag:", error);
        alert("Erro ao atualizar tag. Por favor, tente novamente.");
      }
    }

    try {
      await axios.post(`${apiUrl}/api/tags`, { name });
      alert("Tag criada com sucesso!");
      navigate("/admin/tags");
    } catch (error) {
      console.error("Erro ao criar tag:", error);
      alert("Erro ao criar tag. Por favor, tente novamente.");
    }
  };

  return (
    <Container>
      <Card className="w-full max-w-xl">
        <h2 className="mb-6 text-center text-2xl dark:text-white">
          {id ? "Editar Tag" : "Criar Tag"}
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
        </form>
        <div className="mt-2 flex w-full items-center gap-4">
          <Button
            className="w-full"
            type="button"
            color="failure"
            onClick={() => {
              navigate("/admin/tags");
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
      </Card>
    </Container>
  );
};

export default ManagerTag;
