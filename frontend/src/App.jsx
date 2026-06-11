import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        {/* The agent consolidated your logins into one smart component! */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/faculty/login" element={<LoginPage />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;