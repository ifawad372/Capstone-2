import Cards from './components/Cards/Cards.jsx';
import Register from './components/Auth/Register.jsx';
import Login from './components/Auth/Login.jsx';
import Layout from './Pages/Layout.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './Pages/NotFound.jsx';
import Cart from './Pages/Cart.jsx';

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Cards />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/auth/cart' element={<Cart/>} />
            <Route path='/auth/register' element={<Register/>} />
            <Route path='/auth/login' element={<Login/>} />
          </Route>
        </Routes>
      </Router>
    </>

  )
}

export default App;
