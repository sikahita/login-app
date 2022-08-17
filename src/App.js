
import './App.css';
import Login from './pages/login';
import Reset from './pages/resetPass';
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/resetPass" element={<Reset/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
