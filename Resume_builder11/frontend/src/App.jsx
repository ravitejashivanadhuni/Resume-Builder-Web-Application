import 'react-datepicker/dist/react-datepicker.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './auth/Auth'
import ForgotPassword from './auth/ForgotPassword'
import OtpScreen from './auth/OtpScreen'
import ResetPassword from './auth/ResetPassword'
import EditProfiles from './component/EditProfile/EditProfiles'
import UpdateProfile from './component/EditProfile/UpdateProfile'
import { ProtectedRoute, PublicRoute } from './component/ProtectedRoute'
import ResumeEight from './component/resume/ResumeEight'
import ResumeFive from './component/resume/ResumeFive'
import ResumeFour from './component/resume/ResumeFour'
import ResumeNine from './component/resume/ResumeNine'
import ResumeOne from './component/resume/ResumeOne'
import ResumeSeven from './component/resume/ResumeSeven'
import ResumeSix from './component/resume/ResumeSix'
import ResumeThree from './component/resume/ResumeThree'
import ResumeTwo from './component/resume/ResumeTwo'
import ResumeTen from './component/resume/ResumeTen'
import SelectResume from './component/resume/SelectResume'
import UserMain from './pages/Main'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import ATSScore from './pages/user/ATSScore'
import EnhanceResume from './pages/user/EnhanceResume'
import Home from './pages/user/Home'
import MyProjects from './pages/user/MyProjects'
import ResumeBuilder from './pages/user/ResumeBuilder'
import Templates from './pages/user/Templates'
import UpgradeResume from './pages/user/UpgradeResume'

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Auth /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/verify-otp" element={<PublicRoute><OtpScreen /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

        {/* Protected User Routes */}
        <Route path='/user' element={<ProtectedRoute><UserMain /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='resume-builder' element={<ResumeBuilder />} />
          <Route path='resume-one' element={<ResumeOne />} />
          <Route path='resume-two' element={<ResumeTwo />} />
          <Route path='resume-three' element={<ResumeThree />} />
          <Route path='resume-four' element={<ResumeFour />} />
          <Route path='resume-five' element={<ResumeFive />} />
          <Route path='resume-six' element={<ResumeSix />} />
          <Route path='resume-seven' element={<ResumeSeven />} />
          <Route path='resume-eight' element={<ResumeEight />} />
          <Route path='resume-nine' element={<ResumeNine />} />
          <Route path='resume-ten' element={<ResumeTen />} />
          <Route path='select-resume' element={<SelectResume />} />
          <Route path='edit-profile' element={<EditProfiles />} />
          <Route path='update-profile' element={<UpdateProfile />} />
          <Route path='ats-score' element={<ATSScore />} />
          <Route path='enhance-resume' element={<EnhanceResume />} />
          <Route path='upgrade-resume' element={<UpgradeResume />} />
          <Route path='my-projects' element={<MyProjects />} />
          <Route path='templates' element={<Templates />} />
          <Route path='about-us' element={<AboutUs />} />
          <Route path='contact-us' element={<ContactUs />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
