import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Materias from './pages/Materias.jsx';
import MateriaDetail from './pages/MateriaDetail.jsx';
import Calendario from './pages/Calendario.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './pages/NotFound.jsx';
 
// Patrón de "layout route": Layout (Navbar + Footer) envuelve a todas
// las páginas hijas. Cada página solo se preocupa de su propio contenido.
function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/materias/:id" element={<MateriaDetail />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
 
