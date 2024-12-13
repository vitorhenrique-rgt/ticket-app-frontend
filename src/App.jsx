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
import Tickets from "./pages/tickets/Tickets";
import ManagerUsers from "./pages/users/ManagerUsers";
import CompanyList from "./pages/companies/CompanyList";
import ManagerCompanies from "./pages/companies/ManagerCompanies";
import ManagerTag from "./pages/tags/ManagerTags";
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
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/edit/:id" element={<ManagerUsers />} />
          <Route path="/admin/users/new" element={<ManagerUsers />} />
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
