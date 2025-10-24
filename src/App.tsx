import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DeviceManage from './pages/DeviceManage';
import OrderManage from './pages/OrderManage';
import StationManage from './pages/StationManage';
import FinanceManage from './pages/FinanceManage';
import SysConfig from './pages/SysConfig';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/devices" element={<DeviceManage />} />
          <Route path="/orders" element={<OrderManage />} />
          <Route path="/stations" element={<StationManage />} />
          <Route path="/finance" element={<FinanceManage />} />
          <Route path="/sysconfig" element={<SysConfig />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
