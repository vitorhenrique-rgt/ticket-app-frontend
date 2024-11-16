import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Card } from "flowbite-react";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Verifica se o usuário já está logado
  useEffect(() => {
    const userId = sessionStorage.getItem("userId"); // Ou localStorage se preferir
    if (userId) {
      // Se o usuário já está logado, redireciona para a página de tickets
      navigate("/tickets");
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
        navigate("/tickets");
      }
    } catch (error) {
      setError("Nickname ou senha inválidos.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <h2 className="mb-6 text-center text-2xl dark:text-white">Login</h2>
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
          <div className="flex items-center gap-2">
            {error && <p className="text-center text-red-500">{error}</p>}
          </div>
          <Button type="submit">Log in</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
