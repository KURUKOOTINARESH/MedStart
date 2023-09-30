import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
  return (
    <div className="App">
      <div className='nav-bar'>
        <h1 onClick={()=>navigate("/")}>MEDSTART</h1>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/details' element={<Details/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
