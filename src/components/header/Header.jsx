import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";

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
        <svg
          className="h-[36px] w-[36px] text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V9a5 5 0 1 1 10 0v7.083A2.919 2.919 0 0 1 14.083 19H14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 1.732-1h.351a4.917 4.917 0 0 0 4.83-4H19a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.45 3.275a4 4 0 0 0-4.352.976 1 1 0 0 0 1.452 1.376 2.001 2.001 0 0 1 2.836-.067 1 1 0 1 0 1.386-1.442 4 4 0 0 0-1.321-.843Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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
          <Dropdown.Item
            onClick={() => {
              navigate("/admin");
            }}
          >
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        {location.pathname !== "/tickets" && <Navbar.Toggle />}
      </div>
      {location.pathname !== "/tickets" && (
        <Navbar.Collapse>
          <Navbar.Link
            className="cursor-pointer"
            active={location.pathname === "/new-ticket"}
            onClick={() => {
              navigate("/tickets");
            }}
          >
            Tickets
          </Navbar.Link>
          <Navbar.Link
            className="cursor-pointer"
            active={location.pathname === "/admin"}
            onClick={() => {
              navigate("/admin");
            }}
          >
            Dashboard
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
      )}
    </Navbar>
  );
};

export default Header;
