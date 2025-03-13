import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
import {
  Home,
  LogIn,
  SignUp,
  ProfilePage,
} from './components/pages';
import { PrivateRoute } from './guards';


function App() {

  return (
    <div className="w-100 h-100">
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/me" element={<PrivateRoute><ProfilePage /></PrivateRoute>}></Route>
        <Route path="/profile/:userId" element={<PrivateRoute><ProfilePage /></PrivateRoute>}></Route>
      </Routes>
    </div>
  )
}

export default App
