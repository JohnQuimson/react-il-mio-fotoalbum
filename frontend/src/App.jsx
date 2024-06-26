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
import AdminPage from './middlewares/AdminPage';
import Messages from './pages/Messages';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './layouts/DashboardLayout';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <Routes>
              {/* Rotte Pubbliche */}
              <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Fotos />} />
                <Route path="contacts" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                {/* <Route path="fotos" element={<Fotos />} /> */}
                <Route path="fotos/:id" element={<SingleFoto />} />
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
                  <Route path=":id/edit" element={<EditFoto />} />
                  <Route path="create" element={<CreateFoto />} />
                </Route>
                <Route path="messages" element={<Messages />} />
              </Route>

              {/*Dashboard */}
              <Route
                path="/"
                element={
                  <PrivatePage>
                    <DashboardLayout />
                  </PrivatePage>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
