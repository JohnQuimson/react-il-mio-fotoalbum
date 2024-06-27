import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './contexts/GlobalContext';
import DefaultLayout from './layouts/DefaultLayout';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <Routes>
              {/* Rotte Pubbliche */}
              <Route path="/" element={<DefaultLayout />}>
                <Route />
                <Route index element={<Home />} />
              </Route>
            </Routes>
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
