import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './contexts/GlobalContext';
import DefaultLayout from './layouts/DefaultLayout';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Fotos from './pages/Fotos';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <Routes>
              {/* Rotte Pubbliche */}
              <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="/fotos" element={<Fotos />} />
                <Route path="/contacts" element={<Contact />} />
              </Route>
            </Routes>
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
