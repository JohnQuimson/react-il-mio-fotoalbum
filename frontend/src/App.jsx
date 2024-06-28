import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './contexts/GlobalContext';
import DefaultLayout from './layouts/DefaultLayout';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Fotos from './pages/Fotos';
import SingleFoto from './pages/SingleFoto';
import PrivatePage from './middlewares/PrivatePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateFoto from './pages/CreateFoto';
import EditFoto from './pages/EditFoto';

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
                <Route path="fotos" element={<Fotos />} />
                <Route path="contacts" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              {/* Rotte Private */}
              <Route
                path="/"
                element={
                  <PrivatePage>
                    <DefaultLayout />
                  </PrivatePage>
                }
              >
                <Route path="fotos">
                  <Route path=":id" element={<SingleFoto />} />
                  <Route path=":id/edit" element={<EditFoto />} />
                  <Route path="create" element={<CreateFoto />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
