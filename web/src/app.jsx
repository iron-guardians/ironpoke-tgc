import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import {Route, Routes} from 'react-router-dom';
import {
  Home,
  LogIn,
  SignUp,
  SearchUsers
} from './components/pages';
import { PrivateRoute } from './guards';


function App() {

  return (
    <div className="w-100 h-100">
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/searchUsers" element={<SearchUsers />} />
      </Routes>
    </div>
  )
}

export default App
