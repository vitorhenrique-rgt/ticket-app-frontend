import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthenticatedLayout from "./components/layouts/AuthenticatedLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import UserList from "./pages/users/UserList";
import Tickets from "./pages/tickets/TicketsList";
import TagList from "./pages/tags/TagList";
import EditTag from "./pages/tags/EditTag";
import CreateTag from "./pages/tags/CreateTag";
import ManageUsers from "./pages/users/ManageUsers";
import ManageTicket from "./pages/tickets/ManageTicket";
import CompanyList from "./pages/companies/CompanyList";
import CreateCompany from "./pages/companies/CreateCompany";
import EditCompany from "./pages/companies/EditCompany";
// (outros imports)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AuthenticatedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/new-ticket" element={<ManageTicket />} />
          <Route path="/edit-ticket/:id" element={<ManageTicket />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/edit/:id" element={<ManageUsers />} />
          <Route path="/admin/users/new" element={<ManageUsers />} />
          <Route path="/admin/tags" element={<TagList />} />
          <Route path="/admin/tags/new" element={<CreateTag />} />
          <Route path="/admin/tags/edit/:id" element={<EditTag />} />
          <Route path="/admin/companies" element={<CompanyList />} />
          <Route path="/admin/companies/new" element={<CreateCompany />} />
          <Route path="/admin/companies/edit/:id" element={<EditCompany />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
