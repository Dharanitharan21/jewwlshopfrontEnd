import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Sellpage from './Components/Sellpage';
import Buypage from './Components/Buypage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sellpage' element={<Sellpage />} />
          <Route path='/buypage' element={<Buypage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
