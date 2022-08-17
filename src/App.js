
import './App.css';
import Login from './pages/login';
import { AuthProvider } from './contexts/Auth';
import Reset from './pages/resetPass';
import Dashboard from './pages/dashboard';
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/resetPass" element={<Reset/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
