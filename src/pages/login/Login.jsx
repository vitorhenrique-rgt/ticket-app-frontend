import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl  = import.meta.env.VITE_API_URL

const Login = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
	const navigate = useNavigate();

	// Verifica se o usuário já está logado
	useEffect(() => {
      const userId = sessionStorage.getItem('userId'); // Ou localStorage se preferir
		if (userId) {
			// Se o usuário já está logado, redireciona para a página de tickets
        navigate('/tickets');
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
    setError('');

		try {
			// Chamada à API para autenticar o usuário
      const response = await axios.post(`${apiUrl}/api/login`, { nickname, password });

			// Se a autenticação for bem-sucedida, armazena o ID e o nickname
			if (response.status === 200) {
				const { id, nickname, admin } = response.data.user; // Captura userId e nickname
				// Aqui, você pode armazenar o userId e o nickname em um contexto, localStorage ou onde preferir
        sessionStorage.setItem('userId', id); // Armazena userId no localStorage
        sessionStorage.setItem('nickname', nickname); // Armazena nickname no localStorage
        sessionStorage.setItem('admin', admin);
        navigate('/tickets');
			}
		} catch (error) {
			setError("Nome ou senha inválidos.");
			console.error("Login error:", error);
		}
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="100vh"
		>
			<Card>
				<Box component="form" onSubmit={handleSubmit} width="350px">
					<CardContent>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							flexDirection="column"
							gap="15px"
						>
							<Typography variant="h4" align="center">
								Login
							</Typography>
							{error && (
								<Typography className="text-red-500 text-center">
									{error}
								</Typography>
							)}
							<TextField
								fullWidth
								type="text"
								id="nickname"
								label="Usuário"
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
								required
							/>
							<TextField
								fullWidth
								type="password"
								id="password"
								label="Senha"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Box>
					</CardContent>
					<CardActions>
						<Box
							display="flex"
							justifyContent="space-between"
							width="100%"
							padding="8px"
						>
							<Button fullWidth variant="contained" type="submit">
								Log in
							</Button>
						</Box>
					</CardActions>
				</Box>
			</Card>
		</Box>
	);
};

export default Login;
