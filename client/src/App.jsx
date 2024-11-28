import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SLogin from "./SLogin";
import SSignUp from "./SSignUp";
import SHome from "./SHome";
import LHome from "./LHome";
import LLogin from "./LLogin";
import LSignUp from "./LSignUp";
import LProfile from "./LProfile";
import SProfile from "./SProfile";
import ProtectedRoute from "./ProtectedRoute";
import AttendExam from "./AttendExam";
import ManageStudents from "./ManageStudents";
import IssueNotice from "./IssueNotice";
import UploadModules from "./UploadModules";
import MockExam from "./MockExam";
import FinalExam from "./FinalExam";
import MockResult from "./MockResult";
import FinalResult from "./FinalResult";
import Notifications from "./Notifications";
import StudyMaterials from "./StudyMaterials";
import ExamRoom from "./ExamRoom";
import CreateExam from "./CreateExam";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/Slogin" element={<SLogin />} />
        <Route path="/Ssignup" element={<SSignUp />} />
        <Route path="/llogin" element={<LLogin />} />
        <Route path="/lsignup" element={<LSignUp />} />
        
        {/* Protected Routes (Require login) */}
        <Route
          path="/shome"
          element={
            <ProtectedRoute role="student">
              <SHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lhome"
          element={
            <ProtectedRoute role="lecturer">
              <LHome />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/lprofile"
          element={
            <ProtectedRoute role="lecturer">
              <LProfile />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/Sprofile"
          element={
            <ProtectedRoute role="student">
              <SProfile />
            </ProtectedRoute>
          }
        />
        
        {/* Lecturer-specific routes */}
       
        <Route
          path="/manage-students"
          element={
            <ProtectedRoute role="lecturer">
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/issue-notice"
          element={
            <ProtectedRoute role="lecturer">
              <IssueNotice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-modules"
          element={
            <ProtectedRoute role="lecturer">
              <UploadModules />
            </ProtectedRoute>
          }
        />
        
        {/* Student-specific routes */}
        <Route
          path="/mockexam"
          element={
            <ProtectedRoute role="student">
              <MockExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finalexam"
          element={
            <ProtectedRoute role="student">
              <FinalExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mock-result"
          element={
            <ProtectedRoute role="student">
              <MockResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/final-result"
          element={
            <ProtectedRoute role="student">
              <FinalResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute role="student">
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-materials"
          element={
            <ProtectedRoute role="student">
              <StudyMaterials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ExamRoom"
          element={
            <ProtectedRoute role="student">
              <ExamRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createexam"
          element={
            <ProtectedRoute role="lecturer">
              <CreateExam />
            </ProtectedRoute>
          }
        />
         <Route
          path="/attentexam/:examid"
          element={
            <ProtectedRoute role="student">
              <AttendExam />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
