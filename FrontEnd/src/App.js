import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import  { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Signout from './components/Signout';
import Signup from './components/Signup';
import Create from './components/Create';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/signout" element={<Signout/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/create" element={<Create/>}/>
      </Routes>
    </Router>
  );
}

export default App;
