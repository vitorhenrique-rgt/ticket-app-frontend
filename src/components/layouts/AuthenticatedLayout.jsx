// components/layouts/AuthenticatedLayout.jsx
import { Outlet } from "react-router-dom";
import MainContainer from "../mainContainer/MainContainer";
import Header from "../header/Header";

const AuthenticatedLayout = () => {
  return (
    <MainContainer>
      <Header />
      <Outlet /> {/* Renderiza o conteúdo da rota interna */}
    </MainContainer>
  );
};

export default AuthenticatedLayout;
