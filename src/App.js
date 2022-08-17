
import './App.css';
import Login from './pages/login';
import { AuthProvider } from './contexts/Auth';

function App() {
  return (
    <>
    <AuthProvider>
      <Login/>
    </AuthProvider>
    </>
  );
}

export default App;
