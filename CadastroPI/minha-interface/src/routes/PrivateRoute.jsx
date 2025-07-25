import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register/Register';
import Login from '../pages/Login';
import Profile from "../pages/Profile";
import HomeUsuario from '../pages/HomeUsuario/home';
import TelaInicial from '../pages/TelaInicial/TelaInicial';
import PrivateRoute from './PrivateRoute';
import Pagamento from '../pages/pagamentos/pagamentos';
import Vitrine from '../pages/Vitrine/Vitrine';
import Doacao from '../pages/doação/doacao';
import Apadrinhamento from '../pages/Apadrinhamento/Apadrinhamento';
import CadastroCachorro from '../pages/CadastroCachorro/CadastroCachorro';
import VisualizaApadrinhamento from '../pages/visualizaApadrinhamento/visualizaApadrinhamento'; // Importa o componente

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/home" element={<HomeUsuario />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tela-inicial" element={<TelaInicial />} />
        <Route path="/vitrine" element={<Vitrine />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/doacao" element={<Doacao />} />
        <Route path="/apadrinhamento" element={<Apadrinhamento />} />
        <Route path="/cadastro-cachorro" element={<CadastroCachorro />} />

        {/* Nova rota para visualizar apadrinhamento */}
        <Route path="/visualiza-apadrinhamento" element={<VisualizaApadrinhamento />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}