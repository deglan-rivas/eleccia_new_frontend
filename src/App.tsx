import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { ExpedienteDetail } from './pages/ExpedienteDetail';
import { ResolucionList } from './pages/ResolucionList';
import { Login } from './pages/Login';
import { ParametrosRequisitos } from './pages/ParametrosRequisitos';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Main Application Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expediente/:id" element={<ExpedienteDetail />} />
          <Route path="resoluciones/:codigo" element={<ResolucionList />} />
          <Route path="parametros-requisitos" element={<ParametrosRequisitos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
