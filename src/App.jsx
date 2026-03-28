import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import RaiseComplaint from './pages/RaiseComplaint';
import MainLayout from './layouts/MainLayout';
import SalesLayout from './layouts/SalesLayout';

import Overview from './pages/sales/Overview';
import TicketCreation from './pages/sales/TicketCreation';
import WarrantyTool from './pages/sales/WarrantyTool';
import LogisticsManager from './pages/sales/LogisticsManager';
import StatusTracker from './pages/sales/StatusTracker';

import ServiceLayout from './layouts/ServiceLayout';
import ServiceDashboard from './pages/service/ServiceDashboard';

import AdminLayout from './layouts/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import MasterTicketManagement from './pages/admin/MasterTicketManagement';
import UserManagement from './pages/admin/UserManagement';
import FinancialOversight from './pages/admin/FinancialOversight';
import SystemLogs from './pages/admin/SystemLogs';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Customer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/about" element={<About />} />
              <Route path="/dashboard/services" element={<Services />} />
              <Route path="/dashboard/contact" element={<Contact />} />
              <Route path="/dashboard/complaint" element={<RaiseComplaint />} />
            </Route>
          </Route>

          {/* Sales & BD Routes */}
          <Route element={<ProtectedRoute allowedRoles={['sales']} />}>
            <Route element={<SalesLayout />}>
              <Route path="/sales" element={<Overview />} />
              <Route path="/sales/ticket" element={<TicketCreation />} />
              <Route path="/sales/warranty" element={<WarrantyTool />} />
              <Route path="/sales/logistics" element={<LogisticsManager />} />
              <Route path="/sales/tracker" element={<StatusTracker />} />
            </Route>
          </Route>
          
          {/* Service & Engineer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['service', 'engineer']} />}>
            <Route element={<ServiceLayout />}>
              <Route path="/service" element={<ServiceDashboard />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<DashboardOverview />} />
              <Route path="/admin/tickets" element={<MasterTicketManagement />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/financial" element={<FinancialOversight />} />
              <Route path="/admin/logs" element={<SystemLogs />} />
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
