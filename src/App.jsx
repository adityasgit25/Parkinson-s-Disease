import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
