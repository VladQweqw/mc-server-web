import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './layout/landing';
import Error from './layout/error';
import Dashboard from './layout/dashboard';

export default function App() {

   return(
      <Router>
         <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='*' element={<Error />}></Route>
         </Routes>
      </Router>
   )
}

