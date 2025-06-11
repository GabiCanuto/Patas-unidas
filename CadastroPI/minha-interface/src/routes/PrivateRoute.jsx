import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register/Register';
import Login from '../pages/Login';
import Profile from "../pages/Profile";
import HomeUsuario from '../pages/homeUsuario/home';
import TelaInicial from '../pages/TelaInicial/TelaInicial';
import HomeAdm from '../pages/HomeAdm/HomeAdm';
import PrivateRoute from './PrivateRoute';
import Pagamento from '../pages/pagamentos/pagamentos';
import Vitrine from '../pages/Vitrine/Vitrine';
import Doacao from '../pages/doação/doacao'; // Corrigido: sem acento
import Apadrinhamento from '../pages/Apadrinhamento/Apadrinhamento';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial padrão */}
        <Route path="/" element={<TelaInicial />} />

        <Route path="/home" element={<HomeUsuario />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tela-inicial" element={<TelaInicial />} />
        <Route path="/home-adm" element={<HomeAdm />} />
        <Route path="/vitrine" element={<Vitrine />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/doacao" element={<Doacao />} />
        <Route path="/apadrinhamento" element={<Apadrinhamento />} />

        {/* Rota protegida */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Rota coringa (404) redireciona para Login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
