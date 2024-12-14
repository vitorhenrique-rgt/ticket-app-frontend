import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AuthenticatedLayout from "./components/layouts/AuthenticatedLayout";
import CompanyList from "./pages/companies/CompanyList";
import ManagerCompanies from "./pages/companies/ManagerCompanies";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import ManagerTag from "./pages/tags/ManagerTags";
import Tickets from "./pages/tickets/Tickets";
import Users from "./pages/users/Users";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin/tags/new" element={<ManagerTag />} />
          <Route path="/admin/tags/edit/:id" element={<ManagerTag />} />
          <Route path="/admin/companies" element={<CompanyList />} />
          <Route path="/admin/companies/new" element={<ManagerCompanies />} />
          <Route
            path="/admin/companies/edit/:id"
            element={<ManagerCompanies />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
