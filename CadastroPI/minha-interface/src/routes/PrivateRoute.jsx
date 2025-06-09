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
import Doacao from '../pages/doação/doacao';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} /> {/* Página inicial padrão */}
        <Route path="/home" element={<HomeUsuario />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tela-inicial" element={<TelaInicial />} />
        <Route path="/home-adm" element={<HomeAdm />} />
        <Route path='/Vitrine' element={<Vitrine/>}></Route>
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/doacao" element={<Doacao />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} /> {/* Rota coringa */}
      </Routes>
    </BrowserRouter>
  );
}
