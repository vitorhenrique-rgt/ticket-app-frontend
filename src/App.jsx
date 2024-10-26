import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Tickets from './pages/Tickets';
import NewTicket from './pages/NewTicket';
import UserList from './pages/UserList';
import ProtectedRoute from './pages/ProtectedRoute';
import EditUser from './pages/EditUser';
import CreateUser from './pages/CreateUser';
import CompanyList from './pages/CompanyList';
import EditCompany from './pages/EditCompany';
import CreateCompany from './pages/CreateCompany';
import TagList from './pages/TagList';
import EditTag from './pages/EditTag';
import CreateTag from './pages/CreateTag';
import Dashboard from './pages/Dashboard';

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
