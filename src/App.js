import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import JEDashboard from './pages/JuniorEngineer/JEDashboard';
import CreateDPR from './pages/JuniorEngineer/CreateDPR';
import DPRPreview from './pages/JuniorEngineer/DPRPreview';
import MyDrafts from './pages/JuniorEngineer/MyDrafts';
import SubmittedDPRs from './pages/JuniorEngineer/SubmittedDPRs';
import SEDashboard from './pages/SeniorEngineer/SEDashboard';
import ReviewDPR from './pages/SeniorEngineer/ReviewDPR';
import ApprovedDPRs from './pages/SeniorEngineer/ApprovedDPRs';
import CreateTender from './pages/SeniorEngineer/CreateTender';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagement from './pages/Admin/UserManagement';
import RateMaster from './pages/Admin/RateMaster';
import SystemSettings from './pages/Admin/SystemSettings';
import AuditLogs from './pages/Admin/AuditLogs';
import ContractorDashboard from './pages/Contractor/ContractorDashboard';
import TenderDetails from './pages/Contractor/TenderDetails';
import SubmitBid from './pages/Contractor/SubmitBid';
import MyBids from './pages/Contractor/MyBids';
import AwardedWorks from './pages/Contractor/AwardedWorks';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Junior Engineer Routes */}
          <Route path="/je/dashboard" element={<ProtectedRoute role="junior_engineer"><JEDashboard /></ProtectedRoute>} />
          <Route path="/je/create-dpr" element={<ProtectedRoute role="junior_engineer"><CreateDPR /></ProtectedRoute>} />
          <Route path="/je/dpr-preview/:id" element={<ProtectedRoute role="junior_engineer"><DPRPreview /></ProtectedRoute>} />
          <Route path="/je/my-drafts" element={<ProtectedRoute role="junior_engineer"><MyDrafts /></ProtectedRoute>} />
          <Route path="/je/submitted" element={<ProtectedRoute role="junior_engineer"><SubmittedDPRs /></ProtectedRoute>} />
          
          {/* Senior Engineer Routes */}
          <Route path="/se/dashboard" element={<ProtectedRoute role="senior_engineer"><SEDashboard /></ProtectedRoute>} />
          <Route path="/se/review-dpr/:id" element={<ProtectedRoute role="senior_engineer"><ReviewDPR /></ProtectedRoute>} />
          <Route path="/se/approved" element={<ProtectedRoute role="senior_engineer"><ApprovedDPRs /></ProtectedRoute>} />
          <Route path="/se/create-tender" element={<ProtectedRoute role="senior_engineer"><CreateTender /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute role="admin"><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/rate-master" element={<ProtectedRoute role="admin"><RateMaster /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute role="admin"><SystemSettings /></ProtectedRoute>} />
          <Route path="/admin/audit-logs" element={<ProtectedRoute role="admin"><AuditLogs /></ProtectedRoute>} />
          
          {/* Contractor Routes */}
          <Route path="/contractor/dashboard" element={<ProtectedRoute role="contractor"><ContractorDashboard /></ProtectedRoute>} />
          <Route path="/contractor/tender/:id" element={<ProtectedRoute role="contractor"><TenderDetails /></ProtectedRoute>} />
          <Route path="/contractor/submit-bid/:id" element={<ProtectedRoute role="contractor"><SubmitBid /></ProtectedRoute>} />
          <Route path="/contractor/my-bids" element={<ProtectedRoute role="contractor"><MyBids /></ProtectedRoute>} />
          <Route path="/contractor/awarded" element={<ProtectedRoute role="contractor"><AwardedWorks /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

