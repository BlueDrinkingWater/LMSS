import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SubscriberDashboard from './pages/subscriber/SubscriberDashboard';
import RegisterTeam from './pages/subscriber/RegisterTeam';
import ManagePlayers from './pages/subscriber/ManagePlayers';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Subscriber Routes */}
        <Route 
          path="/subscriber/dashboard" 
          element={<PrivateRoute role="subscriber"><SubscriberDashboard /></PrivateRoute>} 
        />
        <Route 
          path="/subscriber/register-team" 
          element={<PrivateRoute role="subscriber"><RegisterTeam /></PrivateRoute>} 
        />
        <Route 
          path="/subscriber/manage-team/:teamId" 
          element={<PrivateRoute role="subscriber"><ManagePlayers /></PrivateRoute>} 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} 
        />
      </Routes>
    </>
  );
}

export default App;