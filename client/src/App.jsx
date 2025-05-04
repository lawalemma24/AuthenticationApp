// import FloatingShape from './components/flooatingShape'
import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import LogIn from './pages/logIn'
import SignUp from './pages/signUp'
import EmailVerificationPage from './pages/emailVerificationPage'
import Dashboard from './pages/dashboard'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import {  useEffect } from 'react'
import LoadingSpinner from './components/loadingSpinner'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import CreateContact from './pages/createContact'
import ResetPasswordPage from './pages/resetPassword'


//Protected Routes that requires authentication
const ProtectedRoute = ({ children }) => {

const {isAuthenticated,user} = useAuthStore()

if (!isAuthenticated) {
  return <Navigate to = "/login" replace />

} 

if (!user.isVerified) {
  return <Navigate to = "/verify-email" replace />
}
return children
}

//redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore()

  if (isAuthenticated && user.isVerified) {
    return <Navigate to = '/' replace />
  }
  return children
}
function App() {
    const {isCheckingAuth, checkAuth,} = useAuthStore()

    useEffect(() =>{
      checkAuth()
    },[checkAuth]);

    // console.log("isauthenticated" , isAuthenticated);
    // console.log("user" , user);
    if (isCheckingAuth) return <LoadingSpinner/>
    

  return (
    <div className='min-w-screen min-h-screen bg-gradient-to-br 
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative  '>
     

      <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
      <Route path='/signup' element={
        <RedirectAuthenticatedUser>
        <SignUp/>
        </RedirectAuthenticatedUser>}/>
      <Route path='/login' element={
         <RedirectAuthenticatedUser>
        <LogIn/>
        </RedirectAuthenticatedUser>
        
        }/>
      <Route path='/verify-email' element={<EmailVerificationPage/>}/>
      <Route path = "/forgot-password" element= {<RedirectAuthenticatedUser>
        <ForgotPasswordPage/>
      </RedirectAuthenticatedUser>} />
      <Route path='/createcontact' element={<CreateContact/>}/>

          <Route path='/resetpassword/:token'
          
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage/>
            </RedirectAuthenticatedUser>
          }

          />
      <Route path='*'
          
          element={
           <Navigate to='/'/>
          }

          />
      </Routes>

      <Toaster/>


    </div>

  )
}

export default App
