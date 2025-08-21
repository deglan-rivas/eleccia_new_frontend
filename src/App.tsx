import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { ExpedienteDetail } from './pages/ExpedienteDetail';
import { ResolucionList } from './pages/ResolucionList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expediente/:id" element={<ExpedienteDetail />} />
          <Route path="resoluciones/:expedienteId" element={<ResolucionList />} />
        </Route>
      </Routes>
    </Router>
    // <div>
    //   ga
    // </div>
  );
}

export default App;
