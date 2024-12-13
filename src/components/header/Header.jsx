import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { TbHeadset } from "react-icons/tb";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Bom dia");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Boa tarde");
    } else {
      setGreeting("Boa noite");
    }
  }, []);

  const nickname = sessionStorage.getItem("nickname");

  // Função de logout
  const handleLogout = () => {
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <Navbar fluid rounded className="border shadow-md">
      <Navbar.Brand
        href=""
        className="gap-3"
        onClick={() => {
          navigate("/tickets");
        }}
      >
        <TbHeadset size={36} className="dark:text-white" />
        <span className="font- bold self-center whitespace-nowrap text-xl dark:text-white">
          TicketApp
        </span>
      </Navbar.Brand>
      <div className="flex gap-4 md:order-2">
        <DarkThemeToggle />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="Configurações"
              rounded
              status="online"
              statusPosition="top-right"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {greeting}, {nickname}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          className="cursor-pointer"
          active={location.pathname === "/dashboard"}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </Navbar.Link>
        <Navbar.Link
          className="cursor-pointer"
          active={location.pathname === "/tickets"}
          onClick={() => {
            navigate("/tickets");
          }}
        >
          Tickets
        </Navbar.Link>
        <Navbar.Link
          className="cursor-pointer"
          active={location.pathname.startsWith("/admin/users")}
          onClick={() => {
            navigate("admin/users");
          }}
        >
          Usuários
        </Navbar.Link>
        <Navbar.Link
          className="cursor-pointer"
          active={location.pathname.startsWith("/admin/tags")}
          onClick={() => {
            navigate("/admin/tags");
          }}
        >
          Tags
        </Navbar.Link>
        <Navbar.Link
          className="cursor-pointer"
          active={location.pathname.startsWith("/admin/companies")}
          onClick={() => {
            navigate("admin/companies");
          }}
        >
          Empresas
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
