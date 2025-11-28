import { Route, Routes } from 'react-router-dom';
import { ForgotPassword } from './components/ForgotPassword';
import { Login } from './components/Login';
import { AuthLayout } from './AuthLayout';
import { ResetPassword } from './components/ResetPassword';
const AuthPage = () => (
  <div className='min-vh-100'
    style={{
      position: 'relative',
      width: '100%',
      overflow: 'auto',
      height: 'auto',
      minHeight: '100vh',
    }}
  >
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="reset-password"
          element={<ResetPassword />}
        />
        <Route
          index
          element={<Login />}
        />
      </Route>
    </Routes>
  </div>
);
export { AuthPage };
