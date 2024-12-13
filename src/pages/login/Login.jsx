import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Card, Alert } from "flowbite-react";
import { TbHeadset, TbLogin2 } from "react-icons/tb";
import { HiInformationCircle } from "react-icons/hi";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Verifica se o usuário já está logado
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Chamada à API para autenticar o usuário
      const response = await axios.post(`${apiUrl}/api/login`, {
        nickname,
        password,
      });

      // Se a autenticação for bem-sucedida, armazena o ID e o nickname
      if (response.status === 200) {
        const { id, nickname, admin } = response.data.user; // Captura userId e nickname
        // Aqui, você pode armazenar o userId e o nickname em um contexto, localStorage ou onde preferir

        sessionStorage.setItem("userId", id); // Armazena userId no localStorage
        sessionStorage.setItem("nickname", nickname); // Armazena nickname no localStorage
        sessionStorage.setItem("admin", admin);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Nome ou senha inválidos.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-center">
        <TbHeadset size={48} className="dark:text-white" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          TicketApp
        </span>
      </div>
      <Card className="w-full max-w-md">
        <h2 className="text-xl font-bold dark:text-white">Login</h2>
        <form
          className="flex w-full max-w-md flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nickname" value="Nome" />
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
          {error && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium">{error}</span>
            </Alert>
          )}
          <Button color="blue" type="submit">
            Log in
            <TbLogin2 className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
