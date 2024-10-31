import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import CompanyList from './pages/companies/CompanyList';
import CreateCompany from './pages/companies/CreateCompany';
import EditCompany from './pages/companies/EditCompany';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import CreateTag from './pages/tags/CreateTag';
import EditTag from './pages/tags/EditTag';
import TagList from './pages/tags/TagList';
import NewTicket from './pages/tickets/NewTicket';
import Tickets from './pages/tickets/TicketsList';
import CreateUser from './pages/users/CreateUser';
import EditUser from './pages/users/EditUser';
import UserList from './pages/users/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/new-ticket" element={<NewTicket />} />

        <Route path="/admin" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        } />
        <Route path="/admin/users/edit/:id" element={
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        } />
        <Route path="/admin/users/new" element={
          <ProtectedRoute>
            <CreateUser />
          </ProtectedRoute>
        } />

        <Route path="/admin/companies" element={
          <ProtectedRoute>
            <CompanyList />
          </ProtectedRoute>
        } />
        <Route path="/admin/companies/edit/:id" element={
          <ProtectedRoute>
            <EditCompany />
          </ProtectedRoute>
        } />
        <Route path="/admin/companies/new" element={
          <ProtectedRoute>
            <CreateCompany />
          </ProtectedRoute>
        } />

<Route path="/admin/tags" element={
          <ProtectedRoute>
            <TagList />
          </ProtectedRoute>
        } />
        <Route path="/admin/tags/edit/:id" element={
          <ProtectedRoute>
            <EditTag />
          </ProtectedRoute>
        } />
        <Route path="/admin/tags/new" element={
          <ProtectedRoute>
            <CreateTag />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
